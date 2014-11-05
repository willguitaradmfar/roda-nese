inject.define("core.components.palleta", [
		"core.utils.dao.compDB",		
		"plugins.components.component",
		"plugins.layouts.layout",
		"core.utils.legend",
		"core.utils.makeComponents",
	function (dao, components, layouts, legend, makeComponents) {
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
		
		self.palleta = function(target) {
			var accordion = makeComponents.makeAccordion(target);

			for(var i in layouts){
				var layout = layouts[i];
				console.debug('ADD LAYOUT TO PALLETA ('+i+')');

				var templ = generateComponentLayout(layout.templ, layout.name);			
				
				accordion.add(layout.name, layout.category, templ);
				layout.location = legend.attrPalleta;
				dao.updateCompDB(templ, layout, legend.attrPalleta);
			}

			

			for(var i in components){
				var componente = components[i];
				console.debug('ADD COMPONENT TO PALLETA ('+i+')');

				var templ = generateComponent(componente.templ, componente.name);

				accordion.add(componente.name, componente.category, templ);
				componente.location = legend.attrPalleta;
				dao.updateCompDB(templ, componente, legend.attrPalleta);
			}
			
		};
		return self;
	}]);