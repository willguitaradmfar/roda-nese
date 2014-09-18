var templates = templates || {};

templates.h4 = (function () {

	var templ = '<h4>H4</h4>';

	var property = {};		
	property.label = 'H4';
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
		'name' : 'h4',
		'property' : property,
		'update' : update,
		'category' : 'label'
	};
})();