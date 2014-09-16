var templates = templates || {};

templates.separatorForm = (function () {

	var templ = '<hr class="col-md-10"/>';

	var property = {};	
	property.largura = '12';	

	var update = function (target, comp) {
		console.debug('UPDATE COMPONENT :'+comp.name);		
		$(target).attr('class', 'component '+'col-md-'+comp.property.largura);		
	};

	return {
		'templ' : templ,
		'name' : 'separatorForm',
		'property' : property,
		'update' : update
	};
})();