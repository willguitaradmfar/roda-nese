inject.define("palletas.components.alertMessage", [function () {
    var self = {};
    self.name = 'alertMessage';
	self.category = 'label';

	self.templ = '<div class="alert-dismissible alert alert-success" role="alert">'
					 +'<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'
					     +'<strong>Titulo</strong> <span>Mensagem<span>'
					   +'</div>';

	self.property = {};

	self.property.titulo = {
		val : 'Título',
		update : function (target, val, comp) {
			$(target).find('strong').text(val);
		}
	};

	self.property.mensagem = {
		val : 'Mensagem',
		update : function (target, val, comp) {
			$(target).find('> span').text(val);
		}
	};

	self.property.combo_tipo = {
		config : {
			options : ['default', 'info', 'danger', 'success', 'warning']
		},
		val : 'default',
		update : function (target, val, comp) {
			$(target).attr('class', 'alert-dismissible component alert alert-'+val);
		}
	};	
    return self;
}]);