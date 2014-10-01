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

	self.binds = {};
	self.binds.field = 'model';

	self.update = function (target, comp) {
		$(target).text(comp.property.label);

		var bind = comp.binds.field.replace(':', comp.property.context+'.');
		if(comp.binds.field)
			$(target).attr('data-ng-bind', bind);
		else
			$(target).removeAttr('data-ng-bind');
	};

})(window);