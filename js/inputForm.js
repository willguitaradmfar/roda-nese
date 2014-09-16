var templates = templates || {};

templates.inputForm = (function () {

	var templ = '<div class="input-group">'
					+'<label>Label</label>'
					+'<input type="text" class="form-control" placeholder="Placeholder">'
				+'</div>';

	var property = {};
	property.label = 'Label';
	property.largura = '4';	
	property.placeholder = 'Placeholder';

	var update = function (target, comp) {
		console.debug('UPDATE COMPONENT :'+comp.name);		
		$(target).attr('class', 'input-group component '+'col-md-'+comp.property.largura);
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