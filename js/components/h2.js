var templates = templates || {};

templates.h2 = (function () {

	var templ = '<h2>H2</h2>';

	var property = {};		
	property.label = 'H2';

	var update = function (target, comp) {
		console.debug('UPDATE COMPONENT :'+comp.name);		
		$(target).text(comp.property.label);
	};

	return {
		'templ' : templ,
		'name' : 'h2',
		'property' : property,
		'update' : update
	};
})();