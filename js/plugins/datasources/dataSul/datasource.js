inject.define("plugins.datasources.dataSul.datasource", [
        "core.utils.util",
        "core.utils.base64",        
        "plugins.datasources.dataSul.service",
        "plugins.datasources.dataSul.controller",
        "core.utils.growl",
        "plugins.datasources.dataSul.communicationDataSul",
    function (util, base64, service, controller, growl, communicationDataSul) {

        var self = {};

        self.service = service;
        self.controller = controller;

        self.name = 'dataSul';
        self.category = 'Datasource';
        self.icon = 'tag';
        self.color = 'info';

        self.property = {};
        self.property.nameService = {
            val : 'protheus',
            update : function (target, val, comp) {
                
            }
        };
        
        self.property.url = {
            val : 'http://192.168.122.196:8089/ajax.request',
            update : function (target, val, comp) {
                metadata(comp);
            }
        };

        self.property.table = {
            val : 'cidade',
            update : function (target, val, comp) {
                
            }
        };

        self.property.context = {
            val : 'cxtDS',
            update : function (target, val, comp) {
                
            }
        };        

        self.metadata = {};

        var types = {
            'logical' : 'boolean',
            'date' : 'date',
            'integer' : 'number',
            'decimal' : 'number',
            'character' : 'string'
        };        
      

        var metadata = function (comp) {
            var models = {};
            var actions = {};

            models[comp.property.table.val] = {};

            communicationDataSul.metadadosResult = function (data) {

                growl.info('DADOS RECEBIDOS COM SUCESSO, PROCESSANDO ...');

                for(var i in data){
                    var fields = data[i];
                    for(var ii in fields){
                        var field = fields[ii];
                        var fName = field.cName;
                        models[comp.property.table.val][fName] = {};                        
                        models[comp.property.table.val][fName].type = types[field.cDataType];
                        models[comp.property.table.val][fName].info = util.decodeUTF(field.cLabel);
                    }
                }

                growl.info('PROCESSADOS '+Object.keys(models[comp.property.table.val]).length+' CAMPOS DA TABELA '+comp.property.table.val);

                actions.list = {
                    parameters : []                
                };

                comp.metadata.resource = comp.property.context.val;
                comp.metadata.models = models;
                comp.metadata.actions = actions;                
                
            };

            communicationDataSul.connectionRefused = function () {
                growl.error('NÃO FOI POSSÍVEL ESTABELECER UMA CONEXÃO COM '+comp.property.url.val);
            }

            communicationDataSul.connected = function () {
                growl.info('CONECTADO COM O SERVIDOR');
                communicationDataSul.postMessage();
            }


            communicationDataSul.table = comp.property.table.val;
            communicationDataSul.url = comp.property.url.val;
            communicationDataSul.init();
        };       

        return self;
    }]);