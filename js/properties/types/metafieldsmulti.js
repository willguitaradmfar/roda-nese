inject.define("properties.types.metafieldsmulti", [
		"metadatas.metadata",
		"utils.util",
	function (metadata, util) {
	    var self = {}; 

		self.make = function (comp, field, property, td) {

			var name = 'property.'+field;

			var select = $('<select multiple name="'+name+'" class="form-control input-sm"></select>');

			var models = {};

			var recursive = function (model, meta, modelName) {
				for(var  iii in model){
					var field = model[iii];
					var type = field.type;						
					
					if(type.substring(0,1) == ':') {
						recursive(field.ref, meta, type.replace(/:/, modelName+'.'));
						continue;
					}				

					var jsonKey = {};
					jsonKey.key = meta.resource + '.' + modelName+'.'+iii;

					jsonKey.info = (field.info ? meta.resource + ' -> ' +field.info+'['+type+']' : meta.resource + ' -> ' + modelName+'.'+iii+'['+type+']');
					
					/*
						carro.nome (
							field='nome', 
							path='nome', 
							model='carro', 
							type='string', 
							modelRoot='carro')
						carro.dtcreated (
							field='dtcreated', 
							path='dtcreated', 
							model='carro', 
							type='date', 
							modelRoot='carro')
						carro.modelo.nome (
							field='nome', 
							path='modelo.nome', 
							model='modelo', 
							type='string', 
							modelRoot='carro')
						carro.modelo.marca.nome (
							field='nome', 
							path='modelo.marca.nome', 
							model='marca', 
							type='string', 
							modelRoot='carro')
					*/

					jsonKey.context = meta.resource;
					jsonKey.field = iii;
					jsonKey.path = (modelName+'.'+iii).replace(/^\w*\.(.*)$/, '$1');;					
					jsonKey.model = modelName.replace(/^.*\.(\w*)$/, "$1");
					jsonKey.modelRoot = modelName.replace(/^(\w*)\..*$/, '$1');
					jsonKey.type = type;

					//SET MODEL/ARRAYS
					var sulfixArray = 'List';
					if(!models[jsonKey.context]) models[jsonKey.context] = {};
					if(!models[jsonKey.context][jsonKey.model]) models[jsonKey.context][jsonKey.model] = {};
					if(!models[jsonKey.context][jsonKey.model+sulfixArray]) models[jsonKey.context][jsonKey.model+sulfixArray] = {};					
					models[jsonKey.context][jsonKey.model].type = 'object';
					models[jsonKey.context][jsonKey.model+sulfixArray].type = 'array';	

					var strJsonKey = util.stringify(jsonKey);

					var key = property.key;

					var strJsonKey = util.stringify(jsonKey);
					if(typeof property == 'object' && property.length){
						var filter = property.filter(function(obj){
							return obj.key == jsonKey.key
						});	
						if(filter.length == 1){
							key = filter[0].key;
						}
					}

					if(jsonKey.key == key){
						select.append('<option value=\''+strJsonKey+'\' selected>'+jsonKey.info+'</option>');
					}else{
						select.append('<option value=\''+strJsonKey+'\'>'+jsonKey.info+'</option>');
					}
				}
			}

			metadata.find({}, function(meta){
				for(var ii in meta.models){				
					var model = meta.models[ii];
					var modelName = ii;						
					recursive(model, meta, modelName);
				}
			});


			//ADD MODELS TYPE OBJECTS/ARRAYS
			for(var i in models){
				var context = models[i];
				for(var ii in context){
					var model = context[ii];

					var jsonKey = {};					
					jsonKey.key = i + '.' + ii;

					jsonKey.info = i + ' -> ' + ii+'['+model.type+']';					
				
					jsonKey.context = i;
					jsonKey.field = ii;
					jsonKey.path = (i+'.'+ii);
					jsonKey.model = ii;
					jsonKey.modelRoot = ii;
					jsonKey.type = model.type;

					var key = property.key;

					var strJsonKey = util.stringify(jsonKey);
					if(typeof property == 'object' && property.length){
						var filter = property.filter(function(obj){
							return obj.key == jsonKey.key
						});	
						if(filter.length == 1){
							key = filter[0].key;
						}
					}					

					if(jsonKey.key == key){
						select.append('<option value=\''+strJsonKey+'\' selected>'+jsonKey.info+'</option>');
					}else{
						select.append('<option value=\''+strJsonKey+'\'>'+jsonKey.info+'</option>');
					}			

				}
			}

			td.append(select);
			select.chosen({width:"100%"});
		};	

		return self;
	}]);