inject.define("properties.types.metafields", ["metadatas.metadata", function (metadata) {
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

				var key = ':'+modelName+'.'+iii;
				var info = (field.info ? meta.resource + ' -> ' +field.info+'['+type+']' : meta.resource + ' -> ' + modelName+'.'+iii+'['+type+']');
				var value = info;

				if(typeof property == 'object' 
					&& property.length
					&& property.indexOf(key) >= 0){
					select.append('<option value="'+key+'" selected>'+value+'</option>');
				}else if(key == property){
					select.append('<option value="'+key+'" selected>'+value+'</option>');
				}else{
					select.append('<option value="'+key+'">'+value+'</option>');
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