var templates = templates || {};

templates.h1 = (function () {

	var templ = '<h1>H1</h1>';

	var property = {};		
	property.label = 'H1';

	var update = function (target, comp) {
		console.debug('UPDATE COMPONENT :'+comp.name);		
		$(target).text(comp.property.label);
	};

	return {
		'templ' : templ,
		'name' : 'h1',
		'property' : property,
		'update' : update
	};
})();