(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.componentes = global.desenhador.componentes || {};
	global.desenhador.componentes.h1 = global.desenhador.componentes.h1 || {};
	var self = global.desenhador.componentes.h1;

	self.name = 'h1';
	self.category = 'label';

	self.templ = '<h1>H1</h1>';

	self.property = {};
	self.property.label = 'H1';
	self.property.bind = 'model';

	self.update = function (target, comp) {
		$(target).text(comp.property.label);

		if(comp.property.bind && comp.property.bind.length > 0)
			$(target).attr('data-ng-bind', comp.property.bind);
		else
			$(target).removeAttr('data-ng-bind');
	};
})(window);