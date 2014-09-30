var desenhador = desenhador || {};

(function(desenhador) {
	desenhador.palleta = desenhador.palleta || {};

	desenhador.palleta = function(target) {
		var palleta = $(target);

		for(var i in templates){
			var template = templates[i];
			console.debug('ADD COMPONENT TO PALLETA ('+i+')');
			var templ = $(template.templ);
			templ.addClass('component');
			palleta.find('#'+template.category).find('.panel-body').append(templ);
			desenhador.util.updateCompDB(templ, template, 'data-palleta-id');
		}

		for(var i in resources){

			var servico = resources[i];

			var templSpan = $('<span class="btn btn-warning glyphicon glyphicon-'+(servico.icon || 'cloud')+'"></span>');

			templSpan
				.addClass('nonvisual');

			desenhador.util.updateCompSerializable(templSpan, servico);

			palleta.find('#'+servico.category).find('.panel-body').append(templSpan);

			console.debug('ADD RESOURCE TO PALLETA ('+i+')');
		}
	};

})(desenhador);