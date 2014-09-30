var desenhador = desenhador || {};

(function(desenhador) {
	desenhador.palleta = desenhador.palleta || {};

	desenhador.palleta = function(target) {
		var palleta = $(target);
		try{if(!componentes){}}catch(e){throw 'NÃO EXITE COMPONENTES PARA IMPORTAÇÃO NA PALLETA';}
		

		for(var i in componentes){
			var componente = componentes[i];
			console.debug('ADD COMPONENT TO PALLETA ('+i+')');
			var templ = $(componente.templ);
			templ.addClass('component');
			palleta.find('#'+componente.category).find('.panel-body').append(templ);
			desenhador.util.updateCompDB(templ, componente, 'data-palleta-id');
		}

		for(var i in resources){

			var servico = resources[i];

			var templSpan = $('<span class="btn btn-warning glyphicon glyphicon-'+(servico.icon || 'cloud')+'"></span>');

			templSpan
				.addClass('nonvisual');
				
			desenhador.util.updateCompDB(templSpan, servico, 'data-palleta-id');

			palleta.find('#'+servico.category).find('.panel-body').append(templSpan);

			console.debug('ADD RESOURCE TO PALLETA ('+i+')');
		}
	};

})(desenhador);