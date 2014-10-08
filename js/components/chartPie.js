(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.componentes = global.desenhador.componentes || {};
	global.desenhador.componentes.chartPie = global.desenhador.componentes.chartPie || {};
	var self = global.desenhador.componentes.chartPie;

	self.name = 'chartPie';
	self.category = 'chart';

	self.templ = '<nvd3-pie-chart data="data" width="700" height="700" duration="500" label-type="percent" responsive="true"></nvd3-pie-chart>';

	self.property = {};
	self.property.width = '700';
	self.property.height = '500';
	self.property.metamodels_model = 'models';	
	self.property.metafields_array = '...';

	self.update = function (target, comp) {
		var model = comp.property.metamodels_model;
		var array = comp.property.metafields_array;

		if(model && array){
			$(target).attr('data', model+'.'+array);
		}else if(model){
			$(target).attr('data', model);
		}

		$(target).attr('width', comp.property.width);
		$(target).attr('height', comp.property.height);
	};


})(window);