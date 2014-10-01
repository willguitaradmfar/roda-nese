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
	self.property.bind = 'model';

	self.update = function (target, comp) {
		$(target).text(comp.property.label);

		if(comp.property.bind && comp.property.bind.length > 0)
			$(target).attr('data-ng-bind', comp.property.bind);
		else
			$(target).removeAttr('data-ng-bind');
	};

})(window);