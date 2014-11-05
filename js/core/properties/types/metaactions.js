inject.define("core.properties.types.metaactions", [
		"core.properties.metadata",
		"core.utils.util",
		'core.properties.types.metaactionsConfig',
	function (metadata, util, metaactionsConfig) {
	    var self = {};

			self.make = function (comp, fieldProperty, property, td, $this) {

				var contexts = {};		

				var name = 'property.'+fieldProperty;
				var select = $('<select name="'+name+'" class="form-control input-sm"></select>');

				var makeSelectOption = function (_property) {
					var jsonKey = {};
					if(_property)
						jsonKey.config = _property.config;

					var strJsonKey = util.stringify(jsonKey);
					select.append('<option value=\''+strJsonKey+'\' selected>Selecione ...</option>');	
					
				}
				
				makeSelectOption(property);			

				var containsTypes = function (prop, _type) {
					if(!prop) return true;
					if(!prop.config) return true;
					if(!prop.config.types) return true;

					var types = prop.config.types;

					for(var i in types){
						var type = types[i];
						if(type == _type){
							return true;
						}
					}
					return false;
				};			

				var setMapaModelRoot = function (action, actionName, context) {
					if(!contexts[context]) contexts[context] = {};

					var key = context + '.' + actionName+'()';
					if(!contexts[context][key]) contexts[context][key] = {};
					contexts[context][key].type = 'action';
					contexts[context][key].field = actionName;
					contexts[context][key].metaaction = action;
					contexts[context][key].actionName = actionName;
					
				};				

				var proccess = function (_contexts, _select, td) {
					for(var i in _contexts){
						var context = _contexts[i];
						var contextName = i;
						for(var ii in context){
							var key = context[ii];
							var keyName = ii;

							if(!containsTypes(property, key.type)){
								continue;
							}

							var jsonKey = {};							

							jsonKey.key = keyName;
							var info = (key.info ? contextName + ' -> ' +key.info : keyName);
						
							jsonKey.info = key.info || keyName;
							jsonKey.context = contextName;
							jsonKey.field = key.field;
							jsonKey.path = (key.actionName+'.'+key.field).replace(/^\w*\.(.*)$/, '$1');
							jsonKey.model = key.actionName.replace(/^.*\.(\w*)$/, "$1");
							jsonKey.modelRoot = key.actionName.replace(/^(\w*)\..*$/, '$1');							
							jsonKey.metaaction = key.metaaction;
							jsonKey.type = key.type;

							var strJsonKey = util.stringify(jsonKey);
							
							if(property.val && jsonKey.key == property.val.key){
								_select.append('<option value=\''+strJsonKey+'\' selected>'+info+'</option>');								
							}else{
								_select.append('<option value=\''+strJsonKey+'\'>'+info+'</option>');
							}
						}
					}
				};

				var metadados = metadata.findSync();

				for(var i in metadados){				
					var meta = metadados[i];
					for(var ii in meta.actions){
						var action = meta.actions[ii];
						var actionName = ii;
						setMapaModelRoot(action, actionName, meta.resource);						
					}
				}
				proccess(contexts, select, td);

				td.append(select);
				select.selectize({
					onChange : function (val) {

						if(comp.property[fieldProperty])
							comp.property[fieldProperty].val = util.eval(val);
						
						if(property.update)
							property.update($this, util.eval(val), comp);

						metaactionsConfig.make(comp, fieldProperty, property, td, $this, util.eval(val));
					}
				});
			};	

			return self;
	}]);