var templates = templates || {};

templates.h3 = (function () {

	var templ = '<h3>H3</h3>';

	var property = {};		
	property.label = 'H3';

	var update = function (target, comp) {
		console.debug('UPDATE COMPONENT :'+comp.name);		
		$(target).text(comp.property.label);
	};

	return {
		'templ' : templ,
		'name' : 'h3',
		'property' : property,
		'update' : update,
		'category' : 'label'
	};
})();