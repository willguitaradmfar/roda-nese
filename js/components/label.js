var templates = templates || {};

templates.label = (function () {

	var templ = '<label class="label label-default">Label</label>';

	var property = {};
	property.label = 'Label';
	property.tipo = {val : 'default', options : ['default', 'info', 'danger', 'success', 'warning']};

	var update = function (target, comp) {
		$(target).attr('class', 'component label label-'+comp.property.tipo.val);
		$(target).text(comp.property.label);
	};

	return {
		'templ' : templ,
		'name' : 'label',
		'property' : property,
		'update' : update,
		'category' : 'label'
	};
})();