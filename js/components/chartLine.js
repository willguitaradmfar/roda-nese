(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.componentes = global.desenhador.componentes || {};
	global.desenhador.componentes.chartLine = global.desenhador.componentes.chartLine || {};
	var self = global.desenhador.componentes.chartLine;

	self.name = 'chartLine';
	self.category = 'chart';

	self.templ = '<nvd3-line-graph data="data" responsive="true" width="1000" height="500" duration="2000" guide="true" xlabel="X-AXIS" ylabel="Y-AXIS"></nvd3-line-graph>';

	self.property = {};
	self.property.width = '700';
	self.property.height = '500';
	self.property.metamodels_model = 'models';	
	self.property.metafields_array = '...';

	self.update = function (target, comp) {
		$(target).attr('data', comp.property.metamodels_model+'.'+comp.property.metafields_array);
		$(target).attr('width', comp.property.width);
		$(target).attr('height', comp.property.height);
	};
})(window);