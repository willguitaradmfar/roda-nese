(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.componentes = global.desenhador.componentes || {};
	global.desenhador.componentes.h4 = global.desenhador.componentes.h4 || {};
	var self = global.desenhador.componentes.h4;

	self.name = 'h4';
	self.category = 'label';

	self.templ = '<h4>H4</h4>';

	self.property = {};
	self.property.label = 'H4';
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