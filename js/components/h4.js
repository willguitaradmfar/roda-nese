var templates = templates || {};

templates.h4 = (function () {

	var templ = '<h4>H4</h4>';

	var property = {};		
	property.label = 'H4';

	var update = function (target, comp) {
		console.debug('UPDATE COMPONENT :'+comp.name);		
		$(target).text(comp.property.label);
	};

	return {
		'templ' : templ,
		'name' : 'h4',
		'property' : property,
		'update' : update
	};
})();