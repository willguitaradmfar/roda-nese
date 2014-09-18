var templates = templates || {};

templates.h1 = (function () {

	var templ = '<h1 data-ng-bind="model">H1</h1>';

	var property = {};		
	property.label = 'H1';
	property.bind = 'model';

	var update = function (target, comp) {
		console.debug('UPDATE COMPONENT :'+comp.name);		
		$(target).text(comp.property.label);
		$(target).attr('data-ng-bind', comp.property.bind);
	};

	return {
		'templ' : templ,
		'name' : 'h1',
		'property' : property,
		'update' : update,
		'category' : 'label'
	};
})();