var componentes = componentes || {};

componentes.chartPie = (function () {

	var templ = '<nvd3-pie-chart data="data" width="700" height="700" duration="500" label-type="percent" responsive="true"></nvd3-pie-chart>';

	var property = {};
	property.width = '700';
	property.height = '500';
	property.model = 'models';

	var binds = {}
	binds.array = '...';

	var update = function (target, comp) {
		var model = comp.property.model;
		var array = comp.property.array;

		if(model && array){
			$(target).attr('data', model+'.'+array);
		}else if(model){
			$(target).attr('data', model);
		}

		$(target).attr('width', comp.property.width);
		$(target).attr('height', comp.property.height);
	};

	return {
		'templ' : templ,
		'binds' : binds,
		'name' : 'chartPie',
		'property' : property,
		'update' : update,
		'category' : 'chart'
	};
})();