var resources = resources || {};

resources.servicoRest = (function () {
 

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

    desenhador.services.setFunction(template);    

    var property = {};
    property.nameService = 'modelservice';
    property.host =  'http://localhost:3005/';
    property.url =  'listaDePessoas.json';
    property.collection =  'models';
    

    var update = function (target, comp) {

        var name = comp.property.nameService

       $(target).find('b').text(' '+name);
       desenhador.services.makeService(name, comp);

       var body = 
            '$scope.'+name+'.get = '+name+'.get(function (data){'
                +'\n\t$scope.'+comp.property.collection+' = data;'
            +'\n})';

       desenhador.services.setHand(comp.property.nameService, 'get', body);       

    };    

    return {
        'template' : template,
        'property' : property,
        'category' : 'datasource',
        'update' : update
    };

})();