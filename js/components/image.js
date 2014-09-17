var templates = templates || {};

templates.image = (function () {

	var templ = '<a href="#" class="thumbnail">'
						+'<img alt="100%x200" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNDIiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjEyMSIgeT0iMTAwIiBzdHlsZT0iZmlsbDojYWFhO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjE1cHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MjQyeDIwMDwvdGV4dD48L3N2Zz4=">'				
				+'</a>';

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
		'name' : 'image',
		'property' : property,
		'update' : update,
		'category' : 'label'
	};
})();