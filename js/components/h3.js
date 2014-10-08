(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.componentes = global.desenhador.componentes || {};
	global.desenhador.componentes.h3 = global.desenhador.componentes.h3 || {};
	var self = global.desenhador.componentes.h3;

	self.name = 'h3';
	self.category = 'label';

	self.templ = '<h3>H3</h3>';

	self.property = {};
	self.property.label = 'H3';
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