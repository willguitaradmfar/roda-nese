inject.define("palletas.palleta", [
		"utils.dao.compDB",
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

				var miniComp = $('<div></div>');
				var representation = $('<div class="btn btn-warning glyphicon glyphicon-cloud"></div>').addClass('miniComp');
				var original = $(layout.templ).addClass('normalComp').addClass('des-layout');

				miniComp
					.append(representation)
					.append(original);

				miniComp.addClass('des-layout');

				//palleta.find('#'+layout.category).find('.panel-body').append(miniComp);

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
				var service = datasource[i];
				console.debug('ADD RESOURCE TO PALLETA ('+i+')');

				var templSpan = $('<span class="btn btn-'+(service.color || 'warning')+' glyphicon glyphicon-'+(service.icon || 'cloud')+'"></span><span>.</span>');
				templSpan
					.addClass('nonvisual');				
				palleta.find('#'+service.category).find('.panel-body').append(templSpan);
				
				service.location = legend.attrPalleta;
				dao.updateCompDB(templSpan, service, legend.attrPalleta);
			}
		};
		return self;
	}]);