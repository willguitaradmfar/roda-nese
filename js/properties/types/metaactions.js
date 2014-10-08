(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.properties = global.desenhador.properties || {};
	global.desenhador.properties.types = global.desenhador.properties.types || {};
	global.desenhador.properties.types.metaactions = global.desenhador.properties.types.metaactions || {};
	var self = global.desenhador.properties.types.metaactions;

	self.make = function (comp, field, property, td) {
		var name = 'property.'+field;
		
		var isMultipleSelect = field.substring(0,5) == 'mult_';

		var select = $('<select '+(isMultipleSelect ? 'multiple' : '')+' name="'+name+'" class="form-control"></select>');
		
		if(!isMultipleSelect)
			select.append('<option value="" selected>Selecione ...</option>');
		
		var functions = desenhador.controller.getFunctions();
		desenhador.metadata.find({}, function(meta){						

			for(var ii in meta.actions){
				var action = meta.actions[ii];
				for(var  iii in action.parameter){
					var parameter = action.parameter[iii];
					var parameters = parameter.join(', ');

					var key = meta.resource+'.'+ii+'('+parameters+')';
					var value = meta.resource + ' -> ' + ii+'('+parameters.replace(/:/g, '')+')';

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
		});
		td.append(select);
		select.chosen({width:"100%"});
	};	

})(window);