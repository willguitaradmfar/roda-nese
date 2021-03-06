inject.define("plugins.datasources.static.datasource", [
        "plugins.datasources.static.controller",
        "plugins.datasources.static.filter",
        "core.utils.growl",
    function (controller, filter, growl) {
        var self = {};

        self.controller = controller;
        self.filter = filter;

        self.name = 'static';
        self.category = 'Datasource';
        self.icon = 'eye-open';
        self.color = 'success';

        self.property = {};

        self.property.nameService = {
            val : 'static',
            update : function (target, val, comp) {
                metadata(comp);
            }
        };

        self.property.context = {
            val : 'context',
            update : function (target, val, comp) {
                metadata(comp);
            }
        };         

        self.metadata = {};

        var metadata = function (comp, cb) {
           var models = {};

            var marca = {nome : {type : 'string', required : true}};
            var modelo = {nome : { type : 'string',required : true},marca : {type : ':marca',ref : marca}};

            models.revisao = {
                codigo : {
                    type : 'number'
                },
                data : {
                    type : 'date'
                },
                descricao : {
                    type : 'string'
                },
                valor : {
                    type : 'number'
                }
            }

            models.carro = {
                nome : {
                    type : 'string',
                    required : true
                }, 
                revisoes :{
                    type : 'array'
                }, 
                dtcreated : {
                    type : 'date', 
                    required : true
                }, 
                modelo : {
                    type : ':modelo',
                    ref : modelo
                }, 
                power : {
                    type : 'number'
                }
            };            

            var actions = {};        

            actions.list = {
                parameters : []                
            };

            actions.save = {                
                parameters : [{
                    types : ['object']
                }]
            };

            actions.remove = {
              parameters : [{
                    types : ['object']
                }]  
            };

            growl.info('METADADOS static PROCESSADO !!!');

            comp.metadata.resource = comp.property.context.val;
            comp.metadata.models = models;
            comp.metadata.actions = actions;            
        };          

        return self;
    }]);