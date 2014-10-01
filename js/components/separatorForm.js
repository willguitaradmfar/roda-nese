(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.componentes = global.desenhador.componentes || {};
	global.desenhador.componentes.separatorForm = global.desenhador.componentes.separatorForm || {};
	var self = global.desenhador.componentes.separatorForm;

	self.name = 'separatorForm';
	self.category = 'label';

	self.templ = '<hr/>';

	self.property = {};

	self.update = function (target, comp) {
		$(target).attr('class', 'component ');
	};
})(window);