(function (global) {
    global.desenhador = global.desenhador || {};
    global.desenhador.resources = global.desenhador.resources || {};
    global.desenhador.resources.static = global.desenhador.resources.static || {};
    var self = global.desenhador.resources.static;

    self.name = 'static';
    self.category = 'datasource';
    self.icon = 'eye-open';
    self.color = 'success';

    self.property = {};
    self.property.nameService = 'static';
    self.property.context =  'context';
    self.property.collection = 'carroList';

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
    
        desenhador.metadata.factory()
            .set('resource', comp.property.context)
            .set('models', models)
            .set('actions', actions)
            .save();
        cb();
    };

    self.update = function (target, comp, cb) {        
        metadata(comp, cb);        
    };    
})(window);