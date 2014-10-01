(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.componentes = global.desenhador.componentes || {};
	global.desenhador.componentes.progress = global.desenhador.componentes.progress || {};
	var self = global.desenhador.componentes.progress;

	self.name = 'progress';
	self.category = 'label';

	self.templ = '<div class="progress">'
					+'<div style="width: 60%;" role="progressbar" class="progress-bar progress-bar-success progress-bar-striped" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20">'
					+'</div>'
				+'</div>';

	self.property = {};	
	self.property.context = 'context';
	self.property.maxValue = '100';
	self.property.minValue = '0';
	self.property.tipo = {val : 'success', options : ['default', 'info', 'danger', 'success', 'warning']};
	self.property.striped = {val : 'striped', options : ['striped', 'none']};

	self.binds = {};
	self.binds.value = '';

	self.update = function (target, comp) {

		var _class = [];
		_class.push('progress-bar');

		var field = 50;
		if(comp.binds.value){
			field = '{{'+comp.binds.value.replace(/:/, comp.property.context+'.')+'}}';
		}

		if(comp.property.maxValue){
			$(target).find('.progress-bar').attr('aria-valuemax', comp.property.maxValue);
		}

		if(comp.property.minValue){
			$(target).find('.progress-bar').attr('aria-valuemin', comp.property.minValue);
		}
		
		$(target).find('.progress-bar').attr('aria-valuenow', field);
		$(target).find('.progress-bar').attr('style', 'width: '+field+'%;');

		if(comp.property.tipo.val){
			_class.push('progress-bar-'+comp.property.tipo.val);
		}

		if(comp.property.striped.val && comp.property.striped.val != 'none'){
			_class.push('progress-bar-'+comp.property.striped.val);
		}

		$(target).find('.progress-bar').attr('class', _class.join(' '));

	};
})(window);