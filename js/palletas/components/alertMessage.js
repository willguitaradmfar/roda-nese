inject.define("palletas.components.alertMessage", [function () {
    var self = {};
    self.name = 'alertMessage';
	self.category = 'label';

	self.templ = '<div class="alert-dismissible alert alert-success" role="alert">'
					 +'<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'
					     +'<strong>Titulo</strong> <span>Mensagem<span>'
					   +'</div>';

	self.property = {};
	self.property.titulo = 'Titulo';
	self.property.mensagem = 'Mensagem';
	self.property.combo_tipo = {val : 'default', options : ['default', 'info', 'danger', 'success', 'warning']};

	self.update = function (target, comp) {
		$(target).attr('class', 'alert-dismissible component alert alert-'+comp.property.combo_tipo.val);
		$(target).find('strong').text(comp.property.titulo);
		$(target).find('> span').text(comp.property.mensagem);
	};	
    return self;
}]);