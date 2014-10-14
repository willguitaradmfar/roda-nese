inject.define("resources.datasource.static", ["resources.controller.static", function (controller) {
    var self = {};

    self.controller = controller;    

    self.name = 'static';
    self.category = 'datasource';
    self.icon = 'eye-open';
    self.color = 'success';

    self.property = {};
    self.property.nameService = 'static';
    self.property.context =  'context';
    self.property.collection = 'carroList';

    self.metadata = {};

    var metadata = function (comp, cb) {
       var models = {};

        models.marca = {nome : {type : 'string', required : true}};
        models.modelo = {nome : { type : 'string',required : true},marca : {type : ':marca',ref : models.marca}};
        models.carro = {nome : {type : 'string',required : true}, modelo : {type : ':modelo',ref : models.modelo}, power : {type : 'number'}};
        models.message = {message : {type : 'string'}}

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