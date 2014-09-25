var resources = resources || {};

resources.servicoRest = (function () {

    var get = function(){

                $http({ method: 'GET', url: '$url$$pathGet$' }).
                    success(function(data, status, headers, config) {
                        $scope.$collection$ = data;
                    }).
                    error(function(data, status, headers, config) {
                        $scope.$nameService$.$error$.code = status;
                        $scope.$nameService$.$error$.msg = data;
                        console.error('ERROR : HTTP REQUEST : '+status);
                    });
            };

     var post = function(model){
                $http({ method: 'POST', url: '$url$$pathPost$', data: model }).
                    success(function(data, status, headers, config) {
                        $scope.$collection$ = data;
                    }).
                    error(function(data, status, headers, config) {
                        $scope.$nameService$.$error$.code = status;
                        $scope.$nameService$.$error$.msg = data;
                        console.error('ERROR : HTTP REQUEST : '+status);
                    });
            };

    var set = function (model, property) {
        $scope[property] = model;
    };

    var property = {};
    property.nameService = 'serv';
    property.collection =  'models';
    property.error =  'error';
    property.url =  'http://localhost:3005';
    property.pathGet =  '/chart';
    property.pathPost =  '/pessoa';


    var controller = {};
    controller._functions = {};
    controller._variables = {};
    controller._injects = {};
    controller._injects['$http'] = '$http';


    var update = function (target, comp, cb) {

        var keys = ['nameService', 'pathGet', 'collection', 'error', 'url'];
        var values = [comp.property.nameService, comp.property.pathGet, comp.property.collection, comp.property.error, comp.property.url];
        comp.get = desenhador.util.processTemplate(keys, values, comp.templateGet);

        keys = ['nameService', 'pathPost', 'error', 'url', 'collection'];
        values = [comp.property.nameService, comp.property.pathPost, comp.property.error, comp.property.url, comp.property.collection];
        comp.post = desenhador.util.processTemplate(keys, values, comp.templatePost);

        comp.controller._variables = {};
        comp.controller._variables[comp.property.error] = '{}';

        comp.controller._functions.get = comp.get;
        comp.controller._functions.post = comp.post;
        comp.controller._functions.set = comp.set;

        desenhador.util.rest({
            url:comp.property.url+comp.property.pathGet,
            method : 'GET',
            success:function (res) {
                var m = new desenhador.util.dynamicMetadata(res);
                comp.metadata = m.metadata;
                comp.arrays = m.arrays;
                comp.models = m.models;
                if(cb)cb();
            }
        });
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