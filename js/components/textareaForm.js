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

	var update = function (target, comp) {
		console.debug('UPDATE COMPONENT :'+comp.name);		
		$(target).attr('class', 'input-group component ');
		$(target).find('textarea').attr('rows', comp.property.rows);
		$(target).find('textarea').attr('cols', comp.property.cols);
		$(target).find('textarea').attr('placeholder', comp.property.placeholder);
		$(target).find('label').text(comp.property.label);
	};

	return {
		'templ' : templ,
		'name' : 'textareaForm',
		'property' : property,
		'update' : update
	};
})();