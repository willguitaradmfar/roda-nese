inject.define("palletas.palleta", [
	"utils.dao.component",
	"resources.datasource",	
	function (dao, datasource) {
		var self = {};

		self.palleta = function(target) {
			var palleta = $(target);

			try{if(!desenhador.componentes){}}catch(e){throw 'NÃO EXITE COMPONENTES PARA IMPORTAÇÃO NA PALLETA';}

			for(var i in desenhador.layouts){
				var layout = desenhador.layouts[i];
				console.debug('ADD LAYOUT TO PALLETA ('+i+')');
				var templ = $(layout.templ);
				templ.addClass('des-layout');
				palleta.find('#'+layout.category).find('.panel-body').append(templ);
				dao.updateCompDB(templ, layout, 'data-palleta-id');
			}

			for(var i in desenhador.componentes){
				var componente = desenhador.componentes[i];
				console.debug('ADD COMPONENT TO PALLETA ('+i+')');
				var templ = $(componente.templ);
				templ.addClass('component');			
				palleta.find('#'+componente.category).find('.panel-body').append(templ);
				dao.updateCompDB(templ, componente, 'data-palleta-id');
			}

			for(var i in datasource){
				var servico = datasource[i];
				var templSpan = $('<span class="btn btn-'+(servico.color || 'warning')+' glyphicon glyphicon-'+(servico.icon || 'cloud')+'"></span><span>.</span>');

				templSpan
					.addClass('nonvisual');
					
				dao.updateCompDB(templSpan, servico, 'data-palleta-id');
				palleta.find('#'+servico.category).find('.panel-body').append(templSpan);
				console.debug('ADD RESOURCE TO PALLETA ('+i+')');
			}
		};

		return self;
	}]);

