var resources = resources || {};

resources.servicoYql = (function () {

    var query = function(){
                    $.ajax({
                        url: "$url$",
                        jsonp: "callback",
                        dataType: "jsonp",
                        data: {
                            q: '$yql$',
                            format: "json"
                        },
                        success: function( res ) {
                            if(res.error){
                                $scope.$nameService$.$error$.msg = res.description;
                                console.error('ERROR : HTTP REQUEST : '+res.description);
                                return;
                            }
                            if(res.query){
                                $scope.$collection$ = res;
                                $scope.$apply();
                            }
                        }
                    });
            };

    var property = {};
    property.nameService = 'servYql';
    property.collection =  'models';
    property.error =  'error';
    property.url =  'http://query.yahooapis.com/v1/public/yql';
    property.yql =  'select * from local.search where query=\"sushi\" and location=\"san francisco, ca\" and Rating.AverageRating=4';

    var controller = {};
    controller._functions = {};
    controller._variables = {};
    controller._injects = {};

    var metadata = {};
    var arrays = {};
    var models = {};

    var update = function (target, comp, cb) {

        var keys = ['nameService', 'collection', 'error', 'url', 'yql'];
        var values = [comp.property.nameService, comp.property.collection, comp.property.error, comp.property.url, comp.property.yql];
        comp.query = desenhador.util.processTemplate(keys, values, comp.templateQuery);

        comp.controller._variables = {};
        comp.controller._variables[comp.property.error] = '{}';

        comp.controller._functions.query = comp.query;

        desenhador.util.rest({
            url:comp.property.url,
            data:{ q: comp.property.yql, format: "json"},
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
        'metadata' : metadata,
        'arrays' : metadata,
        'models' : metadata,
        'icon' : 'upload',
        'templateQuery' : query,
        'query' : query,
        'property' : property,
        'controller' : controller,
        'category' : 'datasource',
        'update' : update
    };

})();