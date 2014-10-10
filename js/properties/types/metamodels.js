(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.properties = global.desenhador.properties || {};
	global.desenhador.properties.types = global.desenhador.properties.types || {};
	global.desenhador.properties.types.metamodels = global.desenhador.properties.types.metamodels || {};
	var self = global.desenhador.properties.types.metamodels;

	self.make = function (comp, field, property, td) {

		var isMultipleSelect = field.substring(0,5) == 'mult_';
		
		var name = 'property.'+field;

		var select = $('<select '+(isMultipleSelect ? 'multiple' : '')+' name="'+name+'" class="form-control"></select>');
		
		if(!isMultipleSelect)
			select.append('<option value="" selected>Selecione ...</option>');

		desenhador.metadata.find({}, function(meta){
			for(var ii in meta.models){
				var model = meta.models[ii];

				var key = ':'+ii;
				var value = meta.resource + ' -> ' + ii;

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