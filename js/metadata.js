(function(global, undefined) {	
	global.desenhador = global.desenhador || {};
	global.desenhador.metadata = global.desenhador.metadata || {};
		
	var find = function (query, hand) {
		var nonvisuals = $('.des-datasource .nonvisual');
		nonvisuals.each(function (i, nonvisual) {
			var comp = desenhador.util.getCompDBById(nonvisual, 'data-comp-id');
			hand(comp.metadata);
		});
	};	
	global.desenhador.metadata.find = find;	
})(window);