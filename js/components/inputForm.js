var templates = templates || {};

templates.inputForm = (function () {

	var templ = '<div class="input-group">'
					+'<label>Input Text</label>'
					+'<input type="text" class="form-control" placeholder="Placeholder">'
				+'</div>';

	var property = {};
	property.label = 'Input Text';	
	property.placeholder = 'Placeholder';

	var update = function (target, comp) {
		console.debug('UPDATE COMPONENT :'+comp.name);		
		$(target).attr('class', 'input-group component ');
		$(target).find('input').attr('placeholder', comp.property.placeholder);
		$(target).find('label').text(comp.property.label);
	};

	return {
		'templ' : templ,
		'name' : 'inputForm',
		'property' : property,
		'update' : update
	};
})();