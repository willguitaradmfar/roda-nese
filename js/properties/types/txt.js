(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.properties = global.desenhador.properties || {};
	global.desenhador.properties.types = global.desenhador.properties.types || {};
	global.desenhador.properties.types.txt = global.desenhador.properties.types.txt || {};
	var self = global.desenhador.properties.types.txt;

	self.make = function (comp, field, property, td) {			

		var name = 'property.'+field;
		
		var input = $('<input name="'+name+'" type="text" class="form-control" value="'+property+'"></input>');
		td.append(input);
	};	

})(window);