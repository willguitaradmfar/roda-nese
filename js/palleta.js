var desenhador = desenhador || {};

(function(desenhador) {
	desenhador.palleta = desenhador.palleta || {};

	desenhador.palleta = function(target) {
		var palleta = $(target);

		try{if(!desenhador.componentes){}}catch(e){throw 'NÃO EXITE COMPONENTES PARA IMPORTAÇÃO NA PALLETA';}

		for(var i in desenhador.layouts){
			var layout = desenhador.layouts[i];
			console.debug('ADD LAYOUT TO PALLETA ('+i+')');
			var templ = $(layout.templ);
			templ.addClass('des-layout');
			palleta.find('#'+layout.category).find('.panel-body').append(templ);
			desenhador.util.updateCompDB(templ, layout, 'data-palleta-id');
		}

		for(var i in desenhador.componentes){
			var componente = desenhador.componentes[i];
			console.debug('ADD COMPONENT TO PALLETA ('+i+')');
			var templ = $(componente.templ);
			templ.addClass('component');			
			palleta.find('#'+componente.category).find('.panel-body').append(templ);
			desenhador.util.updateCompDB(templ, componente, 'data-palleta-id');
		}

		for(var i in desenhador.resources){
			var servico = desenhador.resources[i];
			var templSpan = $('<span class="btn btn-warning glyphicon glyphicon-'+(servico.icon || 'cloud')+'"></span>');

			templSpan
				.addClass('nonvisual');
				
			desenhador.util.updateCompDB(templSpan, servico, 'data-palleta-id');
			palleta.find('#'+servico.category).find('.panel-body').append(templSpan);
			console.debug('ADD RESOURCE TO PALLETA ('+i+')');
		}
	};

})(desenhador);