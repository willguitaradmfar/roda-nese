var templates = templates || {};

templates.h6 = (function () {

	var templ = '<h6>H6</h6>';

	var property = {};		
	property.label = 'H6';

	var update = function (target, comp) {
		console.debug('UPDATE COMPONENT :'+comp.name);		
		$(target).text(comp.property.label);
	};

	return {
		'templ' : templ,
		'name' : 'h6',
		'property' : property,
		'update' : update,
		'category' : 'label'
	};
})();