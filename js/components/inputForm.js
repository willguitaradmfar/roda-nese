(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.componentes = global.desenhador.componentes || {};
	global.desenhador.componentes.inputForm = global.desenhador.componentes.inputForm || {};
	var self = global.desenhador.componentes.inputForm;

	self.name = 'inputForm';
	self.category = 'input';

	self.templ = '<div class="input-group">'
					+'<label>Input Text</label>'
					+'<input type="text" class="form-control" placeholder="Placeholder">'
				+'</div>';

	self.property = {};
	self.property.label = 'Input Text';
	self.property.placeholder = 'Placeholder';
	self.property.context = 'context';

	self.binds = {};
	self.binds.field = 'model';

	self.update = function (target, comp) {
		$(target).attr('class', 'input-group component ');
		$(target).find('input').attr('placeholder', comp.property.placeholder);
		$(target).find('label').text(comp.property.label);
		var bind = comp.binds.field.replace(':', comp.property.context+'.');
		$(target).find('input').attr('data-ng-model', bind);
	};

})(window);