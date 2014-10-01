(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.componentes = global.desenhador.componentes || {};
	global.desenhador.componentes.textareaForm = global.desenhador.componentes.textareaForm || {};
	var self = global.desenhador.componentes.textareaForm;

	self.name = 'textareaForm';
	self.category = 'input';

	self.templ = '<div class="input-group">'
					+'<label>Text Area</label>'
					+'<textarea class="form-control" rows="5", cols="5" placeholder="Placeholder"></textarea>'
				+'</div>';

	self.property = {};
	self.property.label = 'Text Area';
	self.property.placeholder = 'Placeholder';
	self.property.rows = '5';
	self.property.cols = '5';
	self.property.model = 'model';

	self.binds = {};
	self.binds.field = 'field';

	self.update = function (target, comp) {
		$(target).attr('class', 'input-group component ');
		$(target).find('textarea').attr('rows', comp.property.rows);
		$(target).find('textarea').attr('cols', comp.property.cols);
		$(target).find('textarea').attr('placeholder', comp.property.placeholder);
		$(target).find('label').text(comp.property.label);		
		$(target).find('textarea').attr('data-ng-model', comp.property.model+'.'+comp.binds.field);
	};
})(window);