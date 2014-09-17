var templates = templates || {};

templates.separatorForm = (function () {

	var templ = '<hr/>';

	var property = {};

	var update = function (target, comp) {
		console.debug('UPDATE COMPONENT :'+comp.name);		
		$(target).attr('class', 'component ');
	};

	return {
		'templ' : templ,
		'name' : 'separatorForm',
		'property' : property,
		'update' : update
	};
})();