var componentes = componentes || {};

componentes.separatorForm = (function () {

	var templ = '<hr/>';

	var property = {};

	var update = function (target, comp) {
		$(target).attr('class', 'component ');
	};

	return {
		'templ' : templ,
		'name' : 'separatorForm',
		'property' : property,
		'update' : update,
		'category' : 'label'
	};
})();