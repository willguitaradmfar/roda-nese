var templates = templates || {};

templates.h5 = (function () {

	var templ = '<h5>H5</h5>';

	var property = {};
	property.label = 'H5';
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
		'name' : 'h5',
		'property' : property,
		'update' : update,
		'category' : 'label'
	};
})();