var componentes = componentes || {};

componentes.h6 = (function () {

	var templ = '<h6>H6</h6>';

	var property = {};
	property.label = 'H6';
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
		'name' : 'h6',
		'property' : property,
		'update' : update,
		'category' : 'label'
	};
})();