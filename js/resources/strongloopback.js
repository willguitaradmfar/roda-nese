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

    var makeFunctionGet = function (nickname, action) {        
        console.debug('\t', action);
        self.controller._functions[nickname] = (function () {
            alert('teste');
        }).toString();       
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
                        actions[nickname].model = operation.type;
                        actions[nickname].parameter = [[]];
                        actions[nickname].result = {
                            type : operation.type,
                            model : ':'+(operation.items ? operation.items.type : operation.type)
                        };
                        if(operation.method == 'GET'){
                            makeFunctionGet(nickname, actions[nickname]);                        
                        }
                    }                    
                }

                desenhador.metadata.factory()
                    .set('resource', 'SLB')
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