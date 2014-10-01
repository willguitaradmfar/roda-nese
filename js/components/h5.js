(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.componentes = global.desenhador.componentes || {};
	global.desenhador.componentes.h5 = global.desenhador.componentes.h5 || {};
	var self = global.desenhador.componentes.h5;

	self.name = 'h5';
	self.category = 'label';

	self.templ = '<h5>H5</h5>';

	self.property = {};
	self.property.label = 'H5';
	self.property.bind = 'model';

	self.update = function (target, comp) {
		$(target).text(comp.property.label);

		if(comp.property.bind && comp.property.bind.length > 0)
			$(target).attr('data-ng-bind', comp.property.bind);
		else
			$(target).removeAttr('data-ng-bind');
	};

})(window);