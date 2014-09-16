var templates = templates || {};

templates.inputForm = (function () {

	var templ = '<div class="input-group">'
					+'<label>$label$</label>'
					+'<input type="text" class="form-control" placeholder="$placeholder$">'
				+'</div>';

	var property = {};
	property.label = 'Label Default';
	property.largura = '10';	
	property.placeholder = 'Teste Default';

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