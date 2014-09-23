var resources = resources || {};

resources.servicoRest = (function () { 

    var get = function(){            
                $http({ method: 'GET', url: 'http://localhost:3005$pathGet$' }).
                    success(function(data, status, headers, config) {                        
                        $scope.$collection$ = data;
                    }).
                    error(function(data, status, headers, config) {
                        $scope.$error$.code = status;
                        $scope.$error$.msg = data;
                        console.error('ERROR : HTTP REQUEST : '+status);
                    });            
            };

     var post = function(data){            
                $http({ method: 'POST', url: 'http://localhost:3005$pathPost$', data: data }).
                    success(function(data, status, headers, config) {                        
                        $scope.$collection$ = data;
                    }).
                    error(function(data, status, headers, config) {
                        $scope.$error$.code = status;
                        $scope.$error$.msg = data;
                        console.error('ERROR : HTTP REQUEST : '+status);
                    });            
            };

    var set = function (model, property) {
        $scope[property] = model;
    };

    var property = {};
    property.nameService = 'modelservice';
    property.collection =  'models';
    property.error =  'error';
    property.pathGet =  '/listaDePessoas.json';
    property.pathPost =  '/pessoa';


    var controller = {};
    controller._functions = {};
    controller._variables = {};
    controller._injects = {};
    controller._injects['$http'] = '$http';


    var update = function (target, comp) {

        var keys = ['pathGet', 'collection', 'error'];
        var values = [comp.property.pathGet, comp.property.collection, comp.property.error];
        comp.get = desenhador.util.processTemplate(keys, values, comp.templateGet);         

        keys = ['pathPost', 'error'];
        values = [comp.property.pathPost, comp.property.error];
        comp.post = desenhador.util.processTemplate(keys, values, comp.templatePost);         

        comp.controller._variables = {};
        comp.controller._variables[comp.property.error] = '{}';
        comp.controller._functions.get = comp.get;
        comp.controller._functions.post = comp.post;
        comp.controller._functions.set = comp.set;        
    };

    return {
        'templateGet' : get,
        'templatePost' : post,
        'post' : post,
        'get' : get,
        'set' : set,
        'property' : property,
        'controller' : controller,
        'category' : 'datasource',
        'update' : update
    };

})();