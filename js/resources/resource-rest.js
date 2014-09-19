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

    var update = function (target, comp) {
        var name = comp.property.nameService;
        $(target).find('b').text(' '+name);

        comp.get = comp.templateGet
                    .replace(/\$pathGet\$/g, comp.property.pathGet)
                    .replace(/\$collection\$/g, comp.property.collection)
                    .replace(/\$error\$/g, comp.property.error);

         comp.post = comp.templatePost
                    .replace(/\$pathPost\$/g, comp.property.pathPost)                    
                    .replace(/\$error\$/g, comp.property.error);
        

        desenhador.controller.setVariables(comp.property.error, '{}');
        desenhador.controller.setInject('$http', '$http');
        desenhador.controller.setFunctions('get', comp.get);
        desenhador.controller.setFunctions('post', comp.post);
        desenhador.controller.setFunctions('set', comp.set);
    };    

    var remove = function (target, comp) {
        desenhador.controller.removeVariables(comp.property.error, '{}');
        desenhador.controller.removeInject('$http', '$http');
        desenhador.controller.removeFunctions('get', comp.get);
        desenhador.controller.removeFunctions('post', comp.post);
        desenhador.controller.removeFunctions('set', comp.set);
    };

    return {
        'templateGet' : get,
        'templatePost' : post,
        'post' : post,
        'get' : get,
        'set' : set,
        'property' : property,
        'category' : 'datasource',
        'update' : update,
        'remove' : remove
    };

})();