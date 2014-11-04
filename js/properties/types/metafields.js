inject.define("properties.types.metafields", [
		"metadatas.metadata",
		"utils.util",
	function (metadata, util) {
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

			var setMapaModelRoot = function (model, modelName, context) {
				if(!contexts[context]) contexts[context] = {};

				var key = context + '.' + modelName;
				if(!contexts[context][key]) contexts[context][key] = {};
				contexts[context][key].type = 'object';
				contexts[context][key].field = modelName;
				contexts[context][key].modelName = modelName;

				var keyList = context + '.' + 'list';
				if(!contexts[context][keyList]) contexts[context][keyList] = {};
				contexts[context][keyList].type = 'array';
				contexts[context][keyList].field = modelName;
				contexts[context][keyList].modelName = modelName;
			};

			var setMapa = function (model, modelName, context) {

				if(!contexts[context]) contexts[context] = {};
				
				for(var i in model){
					var field = model[i];
					var key = context + '.' + modelName+'.'+i;
					
					if(!contexts[context][key]) contexts[context][key] = {};

					if(field.type.substring(0,1) == ':') {
						contexts[context][key].type = 'object';
						contexts[context][key].field = i;
						contexts[context][key].modelName = modelName;
						setMapa(field.ref, field.type.replace(/:/, modelName+'.'), context);
						continue;
					}
					contexts[context][key] = field;
					contexts[context][key].field = i;
					contexts[context][key].modelName = modelName;
				}
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
						var info = (key.info ? contextName + ' -> ' +key.info+'['+key.type+']' : keyName+'['+key.type+']');
					
						jsonKey.info = key.info || keyName;
						jsonKey.context = contextName;
						jsonKey.field = key.field;
						jsonKey.path = (key.modelName+'.'+key.field).replace(/^\w*\.(.*)$/, '$1');
						jsonKey.model = key.modelName.replace(/^.*\.(\w*)$/, "$1");
						jsonKey.modelRoot = key.modelName.replace(/^(\w*)\..*$/, '$1');
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

			var metadados = metadata.findSync({});

			for(var i in metadados){				
				var meta = metadados[i];
				for(var ii in meta.models){
					var model = meta.models[ii];
					var modelName = ii;											
					setMapaModelRoot(model, ii, meta.resource);
					setMapa(model, ii, meta.resource);
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
				}
			});
		};	

		return self;
	}]);