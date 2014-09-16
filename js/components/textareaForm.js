var templates = templates || {};

templates.textareaForm = (function () {

	var templ = '<div class="input-group">'
					+'<label>Label</label>'
					+'<textarea class="form-control" rows="10", cols="5"></textarea>'
				+'</div>';

	var property = {};
	property.label = 'Label';
	property.rows = '10';
	property.cols = '5';
	property.largura = '6';

	var update = function (target, comp) {
		console.debug('UPDATE COMPONENT :'+comp.name);		
		$(target).attr('class', 'input-group component '+'col-md-'+comp.property.largura);
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