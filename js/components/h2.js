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

	self.update = function (target, comp) {
		$(target).text(comp.property.label);

		if(comp.property.bind && comp.property.bind.length > 0)
			$(target).attr('data-ng-bind', comp.property.bind);
		else
			$(target).removeAttr('data-ng-bind');
	};


})(window);