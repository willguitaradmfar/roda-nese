var resources = resources || {};

resources.servicoYql = (function () {

    var query = function(){

                    $.ajax({
                        url: "$url$",
                     
                        // the name of the callback parameter, as specified by the YQL service
                        jsonp: "callback",
                     
                        // tell jQuery we're expecting JSONP
                        dataType: "jsonp",
                     
                        // tell YQL what we want and that we want JSON
                        data: {
                            q: $scope.$yql$,
                            format: "json"
                        },
                     
                        // work with the response
                        success: function( res ) {
                            if(res.error){                                
                                $scope.$nameService$.$error$.msg = res.description;
                                console.error('ERROR : HTTP REQUEST : '+res.description);
                                return ;
                            }
                            if(res.query){
                                $scope.$collection$ = res.query.results;
                                $scope.$apply();
                            }
                            console.log( res ); // server response
                        }
                    });
            };    

    var property = {};
    property.nameService = 'servYql';
    property.collection =  'models';
    property.error =  'error';
    property.url =  'http://query.yahooapis.com/v1/public/yql';
    property.yql =  'model.yql';

    var controller = {};
    controller._functions = {};
    controller._variables = {};
    controller._injects = {};    


    var update = function (target, comp) {

        var keys = ['nameService', 'collection', 'error', 'url', 'yql'];
        var values = [comp.property.nameService, comp.property.collection, comp.property.error, comp.property.url, comp.property.yql];
        comp.query = desenhador.util.processTemplate(keys, values, comp.templateQuery);

        comp.controller._variables = {};
        comp.controller._variables[comp.property.error] = '{}';

        comp.controller._functions.query = comp.query;               
    };

    return {
        'icon' : 'upload',
        'templateQuery' : query,
        'query' : query,        
        'property' : property,
        'controller' : controller,
        'category' : 'datasource',
        'update' : update
    };

})();