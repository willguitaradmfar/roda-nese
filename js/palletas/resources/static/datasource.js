inject.define("palletas.resources.static.datasource", [
        "palletas.resources.static.controller",
        "utils.growl",
    function (controller, growl) {
        var self = {};

        self.controller = controller;    

        self.name = 'static';
        self.category = 'datasource';
        self.icon = 'eye-open';
        self.color = 'success';

        self.property = {};
        self.property.nameService = 'static';
        self.property.context =  'context';    

        self.metadata = {};

        var metadata = function (comp, cb) {
           var models = {};

            var marca = {nome : {type : 'string', required : true}};
            var modelo = {nome : { type : 'string',required : true},marca : {type : ':marca',ref : models.marca}};

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
                    ref : models.modelo
                }, 
                power : {
                    type : 'number'
                }
            };            

            var actions = {};        

            actions.list = {
                model : ':carro',
                parameter : [[]],
                result : {
                    type : 'array',
                    model : ':carro'
                },
                messages : {                
                    '500' : 'Erro'
                }
            };

            growl.info('METADADOS static PROCESSADO !!!');

            comp.metadata.resource = comp.property.context;
            comp.metadata.models = models;
            comp.metadata.actions = actions;
            cb();
        };

        self.update = function (target, comp, cb) {        
            metadata(comp, cb);        
        };    

        return self;
    }]);