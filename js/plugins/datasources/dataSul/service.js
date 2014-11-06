inject.define("plugins.datasources.dataSul.service", [
	"plugins.datasources.dataSul.communicationDataSul",
	function (communicationDataSul) {
	    var self = {};
	    self.scope = {};

	    
		self.scope.communicationDataSulService = function () {

			var list = function (_parameters, _cb_resp) {

				var table = _parameters.table;
				var url = _parameters.url;

				var comm = _communicationDataSul();

				comm.dataResult = _cb_resp;
				comm.table = table;
	            comm.url = url;
	            comm.getMetadados();
			};

			var send = function (config) {
				var url = config.url || 'http://httpbin.org/post'
				var data = config.data || {};			
				var method = config.method || 'POST';
				var _headers = config.headers;
				var timeout = config.timeout || 1000 * 10;

				var _success = config.success || function (res) {
					console.warn('FUNCTION success NÃO IMPLEMENTADA res: ('+res+')');
				};

				var _error = config.error || function (res) {
					console.warn('FUNCTION error NÃO IMPLEMENTADA res: ('+res+')');
				};

				var _done = config.done || function (res) {
					console.warn('FUNCTION done NÃO IMPLEMENTADA res: ('+res+')');
				};			

				$.ajax({
					url: url,							
					method : method,
					data: data,
					timeout: timeout,
					headers: _headers,
					success: function( res ) {
						console.debug('SUCESSO pollingHttp');
						_success(res);
					},
					error : function(jqXHR, textStatus, errorThrown) {
						console.warn('ERRO pollingHttp');
						var e = {};
						e.jqXHR = jqXHR;
						e.textStatus = textStatus;
						e.errorThrown = errorThrown;
						_error(e);					
					}
				}).done(function ( res ) {
					console.debug('DONE pollingHttp');
					_done(res);
				});

			};

			var _communicationDataSul = function () {

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

		            send({
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

		            send({
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

		            send({
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
		                EventId : 'data',
		                tabela : self.table,
		                'session-id': session
		            }]});            

		            var headers = {};
		            headers['action'] = 'execute';
		            headers['event'] = 'event';
		            headers['session-id'] = session;            

		            send({
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

		            send({
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

		                        var resultData = res.commands.filter(function(d){		                        	
		                            return (d['tt'+self.table] && d['tt'+self.table].length && d['tt'+self.table].length > 0)
		                        });

		                        if(result3001.length > 0){
		                            reconect();
		                        }

		                        if(result3000.length > 0){
		                            postMessage();
		                        }

		                        if(resultData.length > 0){
		                            self.dataResult(resultData[0]['tt'+self.table]);
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

			};		
			
			return {
				list : list		
			}
		};

	    return self;
	}]);