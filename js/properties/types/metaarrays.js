(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.properties = global.desenhador.properties || {};
	global.desenhador.properties.types = global.desenhador.properties.types || {};
	global.desenhador.properties.types.metaarrays = global.desenhador.properties.types.metaarrays || {};
	var self = global.desenhador.properties.types.metaarrays;

	self.make = function (comp, field, property, td) {

		var name = 'property.'+field;		

		var select = $('<select name="'+name+'" class="form-control"></select>');		
		
		select.append('<option value="" selected>Selecione ...</option>');
		
		var services = desenhador.metadata.arrays;

		desenhador.metadata.find({}, function(meta){

				for(var ii in meta.actions){
					var action = meta.actions[ii];
					var result = action.result;						
					var type = result.type; 
					var model = result.model;

					if(type != 'array') continue;

					var key = model+'List';
					var value = meta.resource + ' -> '+model.replace(/:/g, '')+'List ['+type+']';							

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
			});			

		td.append(select);
		select.chosen({width:"100%"});
	};	

})(window);