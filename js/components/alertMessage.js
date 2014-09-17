var templates = templates || {};

templates.alertMessage = (function () {

	var templ = '<div class="alert-dismissible alert alert-success" role="alert">'
				  +'<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'
			      +'<strong>Titulo</strong> <span>Mensagem<span>'
			    +'</div>';

	var property = {};
	property.titulo = 'Titulo';
	property.mensagem = 'Mensagem';
	property.tipo = {val : 'default', options : ['default', 'info', 'danger', 'success', 'warning']};	

	var update = function (target, comp) {
		console.debug('UPDATE COMPONENT :'+comp.name);		
		$(target).attr('class', 'alert-dismissible component alert alert-'+comp.property.tipo.val);
		$(target).find('strong').text(comp.property.titulo);
		$(target).find('> span').text(comp.property.mensagem);
	};

	return {
		'templ' : templ,
		'name' : 'alertMessage',
		'property' : property,
		'update' : update
	};
})();