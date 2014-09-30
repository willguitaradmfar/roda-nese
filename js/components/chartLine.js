var componentes = componentes || {};

componentes.chartLine = (function () {

	var templ = '<nvd3-line-graph data="data" responsive="true" width="1000" height="500" duration="2000" guide="true" xlabel="X-AXIS" ylabel="Y-AXIS"></nvd3-line-graph>';

	var property = {};
	property.width = '700';
	property.height = '500';
	property.model = 'models';

	var binds = {}
	binds.array = '...';

	var update = function (target, comp) {
		$(target).attr('data', comp.property.model+'.'+comp.binds.array);
		$(target).attr('width', comp.property.width);
		$(target).attr('height', comp.property.height);
	};

	return {
		'templ' : templ,
		'binds' : binds,
		'name' : 'chartLine',
		'property' : property,
		'update' : update,
		'category' : 'chart'
	};
})();