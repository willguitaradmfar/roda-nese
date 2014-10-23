inject.define("palletas.resources.protheusRest.datasource", [
        "utils.util",
        "utils.base64",
        "utils.rest",
        "palletas.resources.protheusRest.service",
        "palletas.resources.protheusRest.controller",
        "utils.growl",
    function (util, base64, rest, service, controller, growl) {

        var self = {};

        self.service = service;
        self.controller = controller;

        self.name = 'protheusRest';
        self.category = 'datasource';
        self.icon = 'cloud';
        self.color = 'warning';

        self.property = {};
        self.property.nameService = 'protheus';        
        self.property.urlRest =  'http://172.16.84.84:9090';        
        self.property.table =  'SA1';
        self.property.limit =  '30';
        self.property.OPC =  'DATA';        
        self.property.context =  'context';

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

            var modelID = comp.property.table;
            models[modelID] = {};

            if(!meta){
                growl.error('OPS, METADADOS COM PROBLEMA');
                return ;
            }

            for(var ii in meta.CONTENT.ROWS){
                var field = meta.CONTENT.ROWS[ii];
                models[modelID][field.FIELD] = {};
                if(!types[field.TYPE]){
                    console.warn('TIPO NÃO PROVIDO '+field.datatype);                    
                }
                
                models[modelID][field.FIELD].type = types[field.TYPE];
                models[modelID][field.FIELD].info = base64.decode(field.INFO);
            }

            actions.list = {
                parameter : [[]],
                result : {
                    type : 'array',
                    model : ':'+comp.property.table
                }
            };

            actions.save = {
                parameter : [[]],
                result : {
                    type : 'object',
                    model : ':'+comp.property.table
                }
            };

            growl.info('FORAM PROCESSADOS '+meta.CONTENT.ROWS.length+' CAMPOS PARA O MODELO '+modelID);

            comp.metadata.resource = comp.property.context;
            comp.metadata.models = models;
            comp.metadata.actions = actions;            
        };
      

        var metadata = function (comp, cb) {
            var url = comp.property.urlRest + '/?OPC=METADADOS&OPC1='+comp.property.table;

            var cid = "cid:"+util.random(1000 * 10);
                rest.rest({
                    method : 'GET',
                    url : url,
                    success : function (res) {                        
                        growl.info('METADADOS RECEBIDOS COM SUCESSO');
                        processMeta(comp, util.eval(base64.decode(res)));                        
                    },
                    error : function (e) {                        
                        growl.error('ERRO NA CONSULTA DE METADADOS ('+e.textStatus+')');
                    }
                }
                    
            );
        };

        self.update = function (target, comp, cb) {        
            metadata(comp, cb);        
        };

        return self;
    }]);