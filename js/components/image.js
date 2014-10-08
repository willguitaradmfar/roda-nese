(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.componentes = global.desenhador.componentes || {};
	global.desenhador.componentes.image = global.desenhador.componentes.image || {};
	var self = global.desenhador.componentes.image;

	self.name = 'image';
	self.category = 'imagem';

	self.templ = '<a href="#" class="thumbnail">'
						+'<img alt="100%x200" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNDIiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjEyMSIgeT0iMTAwIiBzdHlsZT0iZmlsbDojYWFhO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjE1cHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MjQyeDIwMDwvdGV4dD48L3N2Zz4=">'
				+'</a>';

	self.property = {};
	self.property.titulo = 'Titulo';
	self.property.mensagem = 'Mensagem';
	self.property.combo_tipo = {val : 'default', options : ['default', 'info', 'danger', 'success', 'warning']};

	self.update = function (target, comp) {
		$(target).attr('class', 'alert-dismissible component alert alert-'+comp.property.combo_tipo.val);
		$(target).find('strong').text(comp.property.titulo);
		$(target).find('> span').text(comp.property.mensagem);
	};
})(window);