var resources = resources || {};

resources.servicoRest = (function () {

    var hands = {};
    hands._functions = {};
    hands._variable = {};

    hands.__functions.get = function () {
        alert('$nameService$');
    };

    var template = function($http){
            var get = function (fun) {
                $http({ method: 'GET', url: '$host$$url$' }).
                    success(function(data, status, headers, config) {                        
                        fun(data);
                    }).
                    error(function(data, status, headers, config) {
                        console.error('ERROR : HTTP REQUEST : '+status);
                    });
            };

            return {
                'get' : get
            };
    };

    var property = {};
    property.nameService = 'modelservice';
    property.host =  'http://localhost:3005/';
    property.url =  'listaDePessoas.json';

    var update = function (target, comp) {
        $(target).find('b').text(' '+comp.property.nameService);

        for(var i in comp.property){            
            var property = comp.property[i];
            console.debug(property);
            comp.template = comp.template.replace('\$'+i+'\$', property);
        }

        comp.servico = "angular.module('desenhador').service('"+comp.property.nameService+"', "+comp.template+");";        
    };    

    return {        
        'template' : template,
        'property' : property,
        'category' : 'datasource',
        'update' : update,
        'hands' : hands
    };

})();