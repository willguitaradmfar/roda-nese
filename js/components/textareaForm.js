var templates = templates || {};

templates.textareaForm = (function () {

	var templ = '<div class="input-group">'
					+'<label>Text Area</label>'
					+'<textarea class="form-control" rows="5", cols="5" placeholder="Placeholder"></textarea>'
				+'</div>';

	var property = {};
	property.label = 'Text Area';
	property.placeholder = 'Placeholder';
	property.rows = '5';
	property.cols = '5';
	property.model = 'model';

	var binds = {};
	binds.field = 'field';

	var update = function (target, comp) {
		$(target).attr('class', 'input-group component ');
		$(target).find('textarea').attr('rows', comp.property.rows);
		$(target).find('textarea').attr('cols', comp.property.cols);
		$(target).find('textarea').attr('placeholder', comp.property.placeholder);
		$(target).find('label').text(comp.property.label);		
		$(target).find('textarea').attr('data-ng-model', comp.property.model+'.'+comp.binds.field);
	};

	return {
		'templ' : templ,
		'name' : 'textareaForm',
		'property' : property,
		'update' : update,
		'category' : 'input',
		'binds' : binds
	};
})();