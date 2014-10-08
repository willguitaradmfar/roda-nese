(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.componentes = global.desenhador.componentes || {};
	global.desenhador.componentes.h6 = global.desenhador.componentes.h6 || {};
	var self = global.desenhador.componentes.h6;

	self.name = 'h6';
	self.category = 'label';

	self.templ = '<h6>H6</h6>';

	self.property = {};
	self.property.label = 'H6';
	self.property.context = 'context';
	self.property.metafields_field = '';

	self.update = function (target, comp) {
		$(target).text(comp.property.label);

		
		if(comp.property.metafields_field){
			var bind = comp.property.metafields_field.replace(':', comp.property.context+'.');
			$(target).attr('data-ng-bind', bind);
		}
		else{
			$(target).removeAttr('data-ng-bind');
		}
	};

})(window);