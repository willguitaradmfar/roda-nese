inject.define("palletas.palleta", [
		"utils.dao.compDB",
		"palletas.resources.datasource",
		"palletas.components.component",
		"palletas.layouts.layout",
		"utils.legend",
	function (dao, datasource, components, layouts, legend) {
		var self = {};

		var generateComponent = function (templ, name) {
			templ = $(templ);
			templ.attr('data-body-component', '');
			return templ;
		};

		var generateComponentLayout = function (templ, name) {
			templ = $(templ);
			templ.attr('data-body-component-layout', '');
			return templ;
		};

		var generateComponentDataSource = function (templ, name) {
			templ = $(templ);
			templ.attr('data-body-component-datasource', '');
			return templ;
		};

		
		self.palleta = function(target) {
			var palleta = $(target);

			for(var i in layouts){
				var layout = layouts[i];
				console.debug('ADD LAYOUT TO PALLETA ('+i+')');				

				var templ = generateComponentLayout(layout.templ, layout.name);
				
				palleta.find('#'+layout.category).find('.panel-body').append(templ);

				layout.location = legend.attrPalleta;
				dao.updateCompDB(templ, layout, legend.attrPalleta);
			}

			for(var i in components){
				var componente = components[i];
				console.debug('ADD COMPONENT TO PALLETA ('+i+')');

				var templ = generateComponent(componente.templ, componente.name);

				palleta.find('#'+componente.category).find('.panel-body').append(templ);
				componente.location = legend.attrPalleta;
				dao.updateCompDB(templ, componente, legend.attrPalleta);
			}

			for(var i in datasource){
				var service = datasource[i];
				console.debug('ADD RESOURCE TO PALLETA ('+i+')');

				var templSpan = $('<span class="btn btn-'+(service.color || 'warning')+' glyphicon glyphicon-'+(service.icon || 'cloud')+'"></span>');
				templSpan
					.addClass('nonvisual');

				var templ = generateComponentDataSource(templSpan, service.name);				

				palleta.find('#'+service.category).find('.panel-body').append(templ);
				
				service.location = legend.attrPalleta;
				dao.updateCompDB(templ, service, legend.attrPalleta);				
				
			}
		};
		return self;
	}]);