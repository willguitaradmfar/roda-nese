inject.define("palletas.palleta", [
		"utils.dao.component",
		"palletas.resources.datasource",
		"palletas.components.component",
		"palletas.layouts.layout",
		"utils.legend",
	function (dao, datasource, components, layouts, legend) {
		var self = {};		
		
		self.palleta = function(target) {
			var palleta = $(target);

			for(var i in layouts){
				var layout = layouts[i];
				console.debug('ADD LAYOUT TO PALLETA ('+i+')');
				var templ = $(layout.templ);
				templ.addClass('des-layout');
				palleta.find('#'+layout.category).find('.panel-body').append(templ);
				layout.location = legend.attrPalleta;
				dao.updateCompDB(templ, layout, legend.attrPalleta);
			}

			for(var i in components){
				var componente = components[i];
				console.debug('ADD COMPONENT TO PALLETA ('+i+')');
				var templ = $(componente.templ);
				templ.addClass('component');			
				palleta.find('#'+componente.category).find('.panel-body').append(templ);
				componente.location = legend.attrPalleta;
				dao.updateCompDB(templ, componente, legend.attrPalleta);
			}

			for(var i in datasource){
				var servico = datasource[i];
				console.debug('ADD RESOURCE TO PALLETA ('+i+')');

				var templSpan = $('<span class="btn btn-'+(servico.color || 'warning')+' glyphicon glyphicon-'+(servico.icon || 'cloud')+'"></span><span>.</span>');
				templSpan
					.addClass('nonvisual');				
				palleta.find('#'+servico.category).find('.panel-body').append(templSpan);
				
				servico.location = legend.attrPalleta;
				dao.updateCompDB(templSpan, servico, legend.attrPalleta);
			}
		};
		return self;
	}]);

