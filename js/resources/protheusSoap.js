(function (global) {
    global.desenhador = global.desenhador || {};
    global.desenhador.resources = global.desenhador.resources || {};
    global.desenhador.resources.protheusSoap = global.desenhador.resources.protheusSoap || {};
    var self = global.desenhador.resources.protheusSoap;

    self.name = 'protheusSoap';
    self.category = 'datasource';
    self.icon = 'globe';
    self.color = 'primary';

    self.property = {};
    self.property.nameService = 'protheus';        
    self.property.urlWS =  'http://192.168.122.94/FWWSMODEL.apw';
    self.property.method =  'GETJSONDATADETAIL';
    self.property.tagResult =  'GETJSONDATADETAILRESULT';
    self.property.model =  'MATA030';
    self.property.table =  'SA1';
    self.property.context =  'context';

    self.metadata = {};

    var types = {
        C : 'string',
        D : 'date',
        N : 'number',
        M : 'string'
    };

    var processMeta = function (comp, meta) {
        var models = {};
        var actions = {};

        for(var i in meta.models){
            var model = meta.models[i];
            var modelID = model.id

            models[modelID] = {};
            for(var ii in model.fields){
                var field = model.fields[ii];
                models[modelID][field.id] = {};                
                if(!types[field.datatype]){
                    console.warn('TIPO NÃO PROVIDO '+field.datatype);
                }
                models[modelID][field.id].type = types[field.datatype];
                models[modelID][field.id].info = field.info;
                models[modelID][field.id].required = (field.obrigat == '1');
            }            
        }

        comp.metadata.resource = comp.property.context;
        comp.metadata.models = models;
        comp.metadata.actions = actions;
        
    };
  

    var metadata = function (comp, cb) {        
        desenhador.util.sendSoap(
            comp.property.urlWS, 
            comp.property.method, 
                {
                    USERTOKEN : "cid:"+desenhador.util.random(1000 * 10),
                    MODELID : comp.property.model,
                    TABLE : comp.property.table
                },
                comp.property.tagResult, 
                function(d){
                    var meta = desenhador.util.eval(desenhador.util.Base64.decode(d));
                    processMeta(comp, meta);
                }
        );
    };

    self.update = function (target, comp, cb) {        
        metadata(comp, cb);        
    };    
})(window);