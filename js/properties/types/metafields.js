inject.define("properties.types.metafields", [
		"metadatas.metadata",
		"utils.util",
	function (metadata, util) {
	    var self = {}; 

		self.make = function (comp, field, property, td) {

			var name = 'property.'+field;	
			
			var select = $('<select name="'+name+'" class="form-control input-sm"></select>');		
			
			select.append('<option value="" selected>Selecione ...</option>');
			
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

					var strJsonKey = util.stringify(jsonKey);

					if(jsonKey.key == property.key){
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
			td.append(select);
			select.chosen({width:"100%"});
		};	

		return self;
	}]);