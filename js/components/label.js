(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.componentes = global.desenhador.componentes || {};
	global.desenhador.componentes.label = global.desenhador.componentes.label || {};
	var self = global.desenhador.componentes.label;

	self.name = 'label';
	self.category = 'label';

	self.templ = '<label class="label label-default">Label</label>';

	self.property = {};
	self.property.label = 'Label';
	self.property.tipo = {val : 'default', options : ['default', 'info', 'danger', 'success', 'warning']};

	self.update = function (target, comp) {
		$(target).attr('class', 'component label label-'+comp.property.tipo.val);
		$(target).text(comp.property.label);
	};


})(window);