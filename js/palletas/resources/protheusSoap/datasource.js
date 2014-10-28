inject.define("palletas.resources.protheusSoap.datasource", [
        "utils.util",
        "utils.base64",
        "utils.soap",
        "palletas.resources.protheusSoap.service",
        "palletas.resources.protheusSoap.controller",
        "utils.growl",
    function (util, base64, soap, service, controller, growl) {

        var self = {};

        self.service = service;
        self.controller = controller;

        self.name = 'protheusSoap';
        self.category = 'datasource';
        self.icon = 'globe';
        self.color = 'primary';

        self.property = {};
        self.property.nameService = 'protheus';        
        self.property.urlWS =  'http://172.16.84.95/FWWSMODEL.apw';    
        self.property.model =  'MATA030';
        self.property.table =  'SA1';
        self.property.context =  'SA1';
        self.property.messageError = 'messageError';

        var method =  'GETJSONDATADETAIL';
        var tagResult =  'GETJSONDATADETAILRESULT';

        self.metadata = {};

        var types = {
            C : 'string',
            D : 'date',
            N : 'number',
            M : 'string'
        };

        var processMeta = function (comp, meta) {
            var models = {};
            var actions = {};

            for(var i in meta.models){
                var model = meta.models[i];

                //NESSE CASE (model.id) == (comp.property.table) QUE REPRESENTA O MODELO
                var modelID = model.id // comp.property.table

                models[modelID] = {};
                for(var ii in model.fields){
                    var field = model.fields[ii];
                    models[modelID][field.id] = {};                
                    if(!types[field.datatype]){
                        console.warn('TIPO NÃO PROVIDO '+field.datatype);
                    }
                    models[modelID][field.id].type = types[field.datatype];
                    models[modelID][field.id].info = field.info;
                    models[modelID][field.id].required = (field.obrigat == '1');
                }            
            }

            actions.list = {
                parameter : [[]],
                result : {
                    type : 'array',
                    model : ':'+comp.property.table
                }
            };        

            comp.metadata.resource = comp.property.context;
            comp.metadata.models = models;
            comp.metadata.actions = actions;

            if(models){
                growl.info('METADADOS PROCESSADO COM SUCESSO !!!');
            }else{
                growl.error('METADADOS NÃO PODE SER PROCESSADO ');
            }
        };
      

        var metadata = function (comp, cb) {
            var cid = "cid:"+util.random(1000 * 10);

            soap.sendSoap(
                comp.property.urlWS, 
                method, 
                    {
                        USERTOKEN : cid,
                        MODELID : comp.property.model,
                        TABLE : comp.property.table
                    },
                    tagResult,
                    function(d){
                        if(d){
                            growl.info('METADADOS RECEBIDOS !!!');
                        }else{
                            growl.error('NÃO FOI RECEBIDO METADADOS DO SERVER');
                        }
                        var meta = util.eval(base64.decode(d));
                        if(meta){
                            growl.info('METADADOS DESERIALIZADO COM SUCESSO!!!');
                            processMeta(comp, meta);
                        }else{
                            growl.error('METADADOS NÃO PODE SER DESERIALIZADO');
                        }                        
                    }, function (e) {
                        growl.error('OCORREU UM ERRO NA REQUISIÇÃO DO METADATA');
                    }
            );
        };

        self.update = function (target, comp, cb) {        
            metadata(comp, cb);        
        };

        return self;
    }]);