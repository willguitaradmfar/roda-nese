var templates = templates || {};

templates.h2 = (function () {

	var templ = '<h2>H2</h2>';

	var property = {};		
	property.label = 'H2';
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
		'name' : 'h2',
		'property' : property,
		'update' : update,
		'category' : 'label'
	};
})();