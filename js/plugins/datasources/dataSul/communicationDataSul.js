inject.define("plugins.datasources.dataSul.communicationDataSul", [
        "core.utils.pollingHttp",
    function (pollingHttp) {
        var self = {};

        var session = '';

        var sessionLessRegexMessage = /^the session '\w*' doesn't exists, action: execute$/;
        var sessionRegexMessage = /^session '(\w*)' started\s{0,}$/;
        var acceptedRegexMessage = /^the request was accepted by the session$/;

        self.getMetadados = function () {            
            if(!session){
                startSession(function (sessionId) {
                    session = sessionId;                    
                    startModule(function () {
                        listenMessage();                                                
                    });
                    
                });
            }else{
                postMessage();
            }
        };

        var startSession = function (cb) {
            var data = {};

            var headers = {};
            headers['action'] = 'start';
            headers['event'] = 'event';

            pollingHttp.send({
                url : self.url,
                data : data,
                headers : headers,
                success : function (res) {
                    cb(res.replace(sessionRegexMessage, "$1"));
                }
            });                
        };

         var startModule = function (cb) {
            var data = {};
            data['StartProg'] = 'TEC';
            data['width'] = 1280;
            data['height'] = 509;
            data['action'] = 'start';
            data['language'] = 'en-US';

            var headers = {};
            headers['action'] = 'execute';
            headers['event'] = 'module';
            headers['session-id'] = session;

            pollingHttp.send({
                url : self.url,
                data : data,
                headers : headers,
                success : function (res) {
                    
                },done : function (res) {
                    cb(res);
                }
            });
        };

        self.resetSession = function () {
            session = '';
            startSession(function (sessionId) {
                session = sessionId;
                startModule();
                postMessage();
                listenMessage();
            });
        };       

        var reconect = function () {
            var data = {};            

            var headers = {};
            headers['action'] = 'execute';
            headers['event'] = 'reconnect';
            headers['session-id'] = session;            

            pollingHttp.send({
                url : self.url,
                data : data,
                headers : headers,
                success : function (res) {
                    if(typeof res == 'string' && acceptedRegexMessage.test(res)){
                        console.debug('MENSAGEM ENVIADA COM SUCESSO');
                        return;
                    }                    
                }
            });  
        };

        var postMessage = function (cb) {
            var data = {};
            data['session-id'] = session;
            data['strJson'] = JSON.stringify({ttEvent : [{
                EventId : 'metadados',
                tabela : self.table,
                'session-id': session
            }]});            

            var headers = {};
            headers['action'] = 'execute';
            headers['event'] = 'event';
            headers['session-id'] = session;            

            pollingHttp.send({
                url : self.url,
                data : data,
                headers : headers,
                success : function (res) {
                    if(typeof res == 'string' && acceptedRegexMessage.test(res)){
                        console.debug('MENSAGEM ENVIADA COM SUCESSO');
                        if(cb) cb(res);
                        return;
                    }                    
                }
            });  
        };

        var listenMessage = function () {

            var data = {};           

            var headers = {};
            headers['action'] = 'polling';            
            headers['session-id'] = session;

            pollingHttp.send({
                url : self.url,
                data : data,
                headers : headers,
                error : function (e) {
                    if(e.errorThrown == "timeout"){
                        listenMessage();    
                    }else if(e.textStatus == "parsererror"){
                        listenMessage();    
                    }else{

                    }
                },
                success : function (res) {                        
                    if(res.commands.length > 0){
                        var result3001 = res.commands.filter(function(d){
                            return (d.idMessage == 3001)
                        });

                        var result3000 = res.commands.filter(function(d){
                            return (d.idMessage == 3000)
                        });

                        var resultMetadados = res.commands.filter(function(d){
                            return (d.ttMetadados && d.ttMetadados.length && d.ttMetadados.length > 0)
                        });

                        if(result3001.length > 0){
                            reconect();
                        }

                        if(result3000.length > 0){
                            postMessage();
                        }

                        if(resultMetadados.length > 0){
                            self.metadadosResult(resultMetadados[0]);
                        }
                    }                    
                    listenMessage();                    
                    
                },
                done : function (res) {
                    console.debug(res);
                    //listenMessage();
                }
            });           
            
        };

        return self;
    }]);