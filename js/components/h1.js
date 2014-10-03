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
	self.property.context = 'context';

	self.binds = {};
	self.binds.field = 'model';

	self.update = function (target, comp) {
		$(target).text(comp.property.label);

		if(comp.binds.field){
			var bind = comp.binds.field.replace(':', comp.property.context+'.');
			$(target).attr('data-ng-bind', bind);
		}
		else{
			$(target).removeAttr('data-ng-bind');
		}
	};
})(window);