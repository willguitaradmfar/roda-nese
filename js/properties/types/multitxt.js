(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.properties = global.desenhador.properties || {};
	global.desenhador.properties.types = global.desenhador.properties.types || {};
	global.desenhador.properties.types.multitxt = global.desenhador.properties.types.multitxt || {};
	var self = global.desenhador.properties.types.multitxt;

	self.make = function (comp, field, property, td) {
		var name = 'property.'+field;
		
		var input = $('<input name="'+name+'" type="text" class="form-control input-sm" value="'+property+'"></input>');
		td.append(input);			
		input.tagsinput();
	};	

})(window);