(function (global) {
    global.desenhador = global.desenhador || {};
    global.desenhador.resources = global.desenhador.resources || {};
    global.desenhador.resources.strongLoopBack = global.desenhador.resources.strongLoopBack || {};
    var self = global.desenhador.resources.strongLoopBack;

    self.name = 'strongLoopBack';
    self.category = 'datasource';

    self.property = {};
    self.property.nameService = 'serv';
    self.property.collection =  'models';
    self.property.error =  'error';
    self.property.url =  'http://localhost:3001';
    self.property.modelRest =  'product';
    self.property.context =  'context';

    self.controller = {};
    self.controller._functions = {};
    self.controller._variables = {};
    self.controller._injects = {};
    self.controller._injects['$http'] = '$http';

    self.arrays = {};
    self.arrays.collection = '';

    self.fGet = (function (config) {
         $http({ method: 'GET', url: '$url$/api$pathGet$' }).
                success(function(data, status, headers, config) {
                    $scope.$collection$ = data;
                }).
                error(function(data, status, headers, config) {
                    $scope.$nameService$.$error$.code = status;
                    $scope.$nameService$.$error$.msg = data;
                    console.error('ERROR : HTTP REQUEST : '+status);
                });
    });

    var makeFunctionGet = function (nickname, action, comp) {        
        comp.controller._functions[nickname] 
            = desenhador.util.processTemplate(
                ['url', 'pathGet', 'collection'],
                [comp.property.url, action.path, comp.arrays.collection.replace(/:/, comp.property.context+'.')], self.fGet);
    };

    var metadata = function (comp, cb) {
        desenhador.util.rest({
            url:comp.property.url+'/explorer/resources/'+comp.property.modelRest,
            method : 'GET',
            success:function (res) {
                var models = {};
                var actions = {};
                for(var i in res.models){
                    var model = res.models[i];
                    models[model.id] = {};
                    for(var ii in model.properties){
                        var field = model.properties[ii];
                        models[model.id][ii] = {};
                        models[model.id][ii].type = field.type;
                    }
                }

                for(var i in res.apis){
                    var api = res.apis[i];
                    for(var ii in api.operations){
                        var operation = api.operations[ii];
                        var nickname = operation.nickname;
                        actions[nickname] = {};
                        actions[nickname].path = api.path;
                        actions[nickname].model = operation.type;
                        actions[nickname].parameter = [[]];
                        actions[nickname].result = {
                            type : operation.type,
                            model : ':'+(operation.items ? operation.items.type : operation.type)
                        };
                        if(operation.method == 'GET'){
                            makeFunctionGet(nickname, actions[nickname], comp);                        
                        }
                    }                    
                }

                desenhador.metadata.factory()
                    .set('resource', comp.property.nameService)
                    .set('models', models)
                    .set('actions', actions)
                    .save();

                    cb();
            }
        });
    };

    self.update = function (target, comp, cb) {        
        metadata(comp, cb);        
    };    
})(window);