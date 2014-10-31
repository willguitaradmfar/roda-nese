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
        self.property.nameService = {
            val : 'protheusRest',
            update : function (target, val, comp) {
                metadata(comp);
            }
        };

        self.property.urlRest = {
            val : 'http://172.16.84.84:9090',
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

        self.property.limit = {
            val : '30',
            update : function (target, val, comp) {
                metadata(comp);
            }
        };

        self.property.OPC = {
            val : 'DATA',
            update : function (target, val, comp) {
                metadata(comp);
            }
        };

        self.property.context = {
            val : 'contextRest',
            update : function (target, val, comp) {
                metadata(comp);
            }
        };

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

            var modelID = comp.property.table.val;
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
               parameters : []
            };

            actions.save = {
                parameters : [{
                    types : ['object']
                }]                
            };

            growl.info('FORAM PROCESSADOS '+meta.CONTENT.ROWS.length+' CAMPOS PARA O MODELO '+modelID);

            comp.metadata.resource = comp.property.context.val;
            comp.metadata.models = models;
            comp.metadata.actions = actions;            
        };
      

        var metadata = function (comp, cb) {
            var url = comp.property.urlRest.val + '/?OPC=METADADOS&OPC1='+comp.property.table.val;

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

        return self;
    }]);