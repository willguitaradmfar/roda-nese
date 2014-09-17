var templates = templates || {};

templates.textareaForm = (function () {

	var templ = '<div class="input-group">'
					+'<label>Text Area</label>'
					+'<textarea class="form-control" rows="5", cols="5"></textarea>'
				+'</div>';

	var property = {};
	property.label = 'Text Area';
	property.rows = '5';
	property.cols = '5';	

	var update = function (target, comp) {
		console.debug('UPDATE COMPONENT :'+comp.name);		
		$(target).attr('class', 'input-group component ');
		$(target).find('textarea').attr('rows', comp.property.rows);
		$(target).find('textarea').attr('cols', comp.property.cols);
		$(target).find('label').text(comp.property.label);
	};

	return {
		'templ' : templ,
		'name' : 'textareaForm',
		'property' : property,
		'update' : update
	};
})();