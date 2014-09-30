var componentes = componentes || {};

componentes.inputForm = (function () {

	var templ = '<div class="input-group">'
					+'<label>Input Text</label>'
					+'<input type="text" class="form-control" placeholder="Placeholder">'
				+'</div>';

	var property = {};
	property.label = 'Input Text';
	property.placeholder = 'Placeholder';
	property.model = 'model';

	var binds = {};
	binds.field = 'model';

	var update = function (target, comp) {
		$(target).attr('class', 'input-group component ');
		$(target).find('input').attr('placeholder', comp.property.placeholder);
		$(target).find('label').text(comp.property.label);
		$(target).find('input').attr('data-ng-model', comp.property.model+'.'+comp.binds.field);
	};

	return {
		'binds' : binds,
		'templ' : templ,
		'name' : 'inputForm',
		'property' : property,
		'update' : update,
		'category' : 'input'
	};
})();