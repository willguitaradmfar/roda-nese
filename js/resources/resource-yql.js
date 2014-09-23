var resources = resources || {};

resources.servicoYql = (function () {

    var get = function(){

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
                                $scope.$error$ = {};                                
                                $scope.$error$.msg = res.description;
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
    property.nameService = 'serv';
    property.collection =  'models';
    property.error =  'error';
    property.url =  'http://query.yahooapis.com/v1/public/yql';
    property.yql =  'model.yql';

    var controller = {};
    controller._functions = {};
    controller._variables = {};
    controller._injects = {};    


    var update = function (target, comp) {

        var keys = ['collection', 'error', 'url', 'yql'];
        var values = [comp.property.collection, comp.property.error, comp.property.url, comp.property.yql];
        comp.get = desenhador.util.processTemplate(keys, values, comp.templateGet);

        comp.controller._variables = {};
        comp.controller._variables[comp.property.error] = '{}';

        comp.controller._functions.get = comp.get;
        comp.controller._functions.post = comp.post;
        comp.controller._functions.set = comp.set;        
    };

    return {
        'icon' : 'upload',
        'templateGet' : get,
        'get' : get,        
        'property' : property,
        'controller' : controller,
        'category' : 'datasource',
        'update' : update
    };

})();