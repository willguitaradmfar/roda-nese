var templates = templates || {};

templates.h1 = (function () {

	var templ = '<h1>H1</h1>';

	var property = {};
	property.label = 'H1';
	property.bind = 'model';

	var update = function (target, comp) {
		$(target).text(comp.property.label);

		if(comp.property.bind && comp.property.bind.length > 0)
			$(target).attr('data-ng-bind', comp.property.bind);
		else
			$(target).removeAttr('data-ng-bind');
	};

	return {
		'templ' : templ,
		'name' : 'h1',
		'property' : property,
		'update' : update,
		'category' : 'label'
	};
})();