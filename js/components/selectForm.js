
(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.componentes = global.desenhador.componentes || {};
	global.desenhador.componentes.selectForm = global.desenhador.componentes.selectForm || {};
	var self = global.desenhador.componentes.selectForm;

	self.name = 'selectForm';
	self.category = 'input';

	self.templ = '<div class="input-group">'
					+'<label>Select</label>'
					+'<select name="selectbasic" class="form-control">'
					     +'<option>Option 1</option>'
					     +'<option>Option 2</option>'
					     +'<option>Option 3</option>'
					   +'</select>'
					+'</div>';

	self.property = {};
	self.property.label = 'Select';
	self.property.options = 'Option 1,Option 2,Option 3';
	self.property.modelSelect = 'model';
	self.property.context = 'context';	

	self.binds = {};
	self.binds.field = 'field';	

	self.arrays = {};
	self.arrays.lista = 'lista';

	self.models = {};
	self.models.select = 'select';

	self.update = function (target, comp) {
		$(target).attr('class', 'input-group component');
		$(target).find('label').text(comp.property.label);
		$(target).find('select').html('');
		var options = comp.property.options.split(',');
		for(var i in options){
			$(target).find('select').append('<option value="'+options[i]+'">'+options[i]+'</option>');
		}

		var context = comp.property.context+'.';		
		$(target).find('select').attr('data-ng-model', comp.models.select.replace(/:/, context));

		var field = comp.binds.field.replace(/:\w*\./, '');
		var array = comp.arrays.lista.replace(':', context);
		var options = 'item as item.'+field+' for item in '+array;

		$(target).find('select').attr('data-ng-options', options);
	};


})(window);