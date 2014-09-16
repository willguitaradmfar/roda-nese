var templates = templates || {};

templates.buttonForm = (function () {

	var templ = '<div class="input-group col-md-12">'					
					+'<button type="button" class="btn btn-default" data-toggle="dropdown">Ok</button>'
				+'</div>';

	var property = {};
	property.label = 'Ok';
	property.largura = '4';
	property.tipo = 'default';

	var update = function (target, comp) {
		console.debug('UPDATE COMPONENT :'+comp.name);		
		$(target).attr('class', 'input-group component '+'col-md-'+comp.property.largura);
		$(target).find('button').attr('class', 'btn component btn-'+comp.property.tipo);
		$(target).find('button').text(comp.property.label);
	};

	return {
		'templ' : templ,
		'name' : 'buttonForm',
		'property' : property,
		'update' : update
	};
})();