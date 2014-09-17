var templates = templates || {};

templates.h5 = (function () {

	var templ = '<h5>H5</h5>';

	var property = {};		
	property.label = 'H5';

	var update = function (target, comp) {
		console.debug('UPDATE COMPONENT :'+comp.name);		
		$(target).text(comp.property.label);
	};

	return {
		'templ' : templ,
		'name' : 'h5',
		'property' : property,
		'update' : update,
		'category' : 'label'
	};
})();