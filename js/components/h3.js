var templates = templates || {};

templates.h3 = (function () {

	var templ = '<h3>H3</h3>';

	var property = {};
	property.label = 'H3';
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
		'name' : 'h3',
		'property' : property,
		'update' : update,
		'category' : 'label'
	};
})();