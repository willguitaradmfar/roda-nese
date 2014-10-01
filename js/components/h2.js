(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.componentes = global.desenhador.componentes || {};
	global.desenhador.componentes.h2 = global.desenhador.componentes.h2 || {};
	var self = global.desenhador.componentes.h2;

	self.name = 'h2';
	self.category = 'label';

	self.templ = '<h2>H2</h2>';

	self.property = {};
	self.property.label = 'H2';
	self.property.bind = 'model';

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