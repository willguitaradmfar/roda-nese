angular.module('desenhador')
    .service('User', function($http){
        var get = function (fun) {
            $http({ method: 'GET', url: 'http://localhost:3005/listaDePessoas.json' }).
            success(function(data, status, headers, config) {
                fun(data);
            }).
            error(function(data, status, headers, config) {
                console.error('ERROR : HTTP REQUEST : '+status);
            });
        }

        return {
            'get' : get
        };
});