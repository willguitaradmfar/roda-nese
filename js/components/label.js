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
	self.property.context = 'context';

	self.binds = {};
	self.binds.field = 'model';

	self.update = function (target, comp) {
		$(target).attr('class', 'component label label-'+comp.property.tipo.val);
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