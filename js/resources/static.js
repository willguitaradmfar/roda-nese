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

    self.controller = {};
    self.controller._functions = {};
    self.controller._variables = {};
    self.controller._injects = {};
    self.controller._injects['$http'] = '$http';

    var tList = (function () {
        if(!$scope.$context$)$scope.$context$ = {};
        $scope.$context$.$collection$ = [
            {nome  : 'Fusca', power : 1, modelo : {nome : 'Fusca', marca : {nome : 'Volksvagem'}}},
            {nome  : 'FOX', power : 14, modelo : {nome : 'FOX CITY', marca : {nome : 'Volksvagem'}}},
            {nome  : 'Corsa', power : 31, modelo : {nome : 'Corsa', marca : {nome : 'Chevrolet'}}},
            {nome  : 'Uno', power : 66, modelo : {nome : 'Uno', marca : {nome : 'Fiat'}}},
            {nome  : 'Brasilia', power : 11, modelo : {nome : 'Brasilia', marca : {nome : 'Volksvagem'}}},
            {nome  : 'i30', power : 80, modelo : {nome : 'i30', marca : {nome : 'Hyundai'}}},
            {nome  : 'Gol', power : 22, modelo : {nome : 'Gol 1.0', marca : {nome : 'Volksvagem'}}}
        ]
    }).toString();

    var makeFunctionGet = function (comp) {        

        comp.controller._functions.list 
            = desenhador.util.processTemplate(
                ['context', 'collection'], 
                [comp.property.context, comp.property.collection],
                tList) ;
    };

    var metadata = function (comp, cb) {
       var models = {};

        models.marca = {nome : {type : 'string', required : true}};

        models.modelo = {nome : { type : 'string',required : true},marca : {type : ':marca',ref : models.marca}};

        models.carro = {nome : {type : 'string',required : true}, modelo : {type : ':modelo',ref : models.modelo}, power : {type : 'number'}};

        models.message = {message : {type : 'string'}}

        var actions = {};

        actions.save = {
            model : ':carro',
            parameter : [[':carro'], [':marca']],
            result : {
                type : 'object',
                model : ':message'
            },
            messages : {
                '200' : 'Veículo criado com sucesso',
                'erroServer' : 'Ocorreu um erro no servidor',
                '500' : 'Erro'
            }
        };

        actions.update = {
            model : ':carro',
            parameter : [[':carro.id', ':carro']],
            result : {
                type : 'object',
                model : ':message'
            },
            messages : {
                '200' : 'Veículo atualizado com sucesso',       
                '500' : 'Erro'
            }
        };

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
            .set('resource', comp.property.nameService)
            .set('models', models)
            .set('actions', actions)
            .save();

        makeFunctionGet(comp);

        cb();
    };

    self.update = function (target, comp, cb) {        
        metadata(comp, cb);        
    };    
})(window);