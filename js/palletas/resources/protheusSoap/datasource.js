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
        self.category = 'datasourcePalleta';
        self.icon = 'globe';
        self.color = 'primary';

        self.property = {};
        self.property.nameService = {
            val : 'protheus',
            update : function (target, val, comp) {
                metadata(comp);
            }
        };
        
        self.property.urlWS = {
            val : 'http://172.16.84.95/FWWSMODEL.apw',
            update : function (target, val, comp) {
                metadata(comp);
            }
        };

        self.property.model = {
            val : 'MATA030',
            update : function (target, val, comp) {
                metadata(comp);
            }
        };

        self.property.table = {
            val : 'SA1',
            update : function (target, val, comp) {
                metadata(comp);
            }
        };

        self.property.context = {
            val : 'contextSA1',
            update : function (target, val, comp) {
                metadata(comp);
            }
        };

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

                //NESSE CASE (model.id) == (comp.property.table.val) QUE REPRESENTA O MODELO
                var modelID = model.id // comp.property.table.val

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
                parameters : []
            };

            actions.save = {
                parameters : [{
                    types : ['object']
                }]
            };

            comp.metadata.resource = comp.property.context.val;
            comp.metadata.models = models;
            comp.metadata.actions = actions;

            if(models){
                growl.info('METADADOS PROCESSADO COM SUCESSO !!!');
            }else{
                growl.error('METADADOS NÃO PODE SER PROCESSADO ');
            }
        };
      

        var metadata = function (comp) {
            var cid = "cid:"+util.random(1000 * 10);

            soap.sendSoap(
                comp.property.urlWS.val, 
                method, 
                    {
                        USERTOKEN : cid,
                        MODELID : comp.property.model.val,
                        TABLE : comp.property.table.val
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

        return self;
    }]);