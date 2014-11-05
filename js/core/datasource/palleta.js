inject.define("core.datasource.palleta", [
		"core.utils.dao.compDB",
		"palletas.resources.datasource",
		"core.utils.legend",
		"core.utils.makeComponents",
	function (dao, datasource, legend, makeComponents) {
		var self = {};
	
		var generateComponentDataSource = function (templ, name) {
			templ = $(templ);
			templ.attr('data-body-component-datasource', '');
			return templ;
		};
		
		self.palleta = function(target) {
			var accordion = makeComponents.makeAccordion(target);

			for(var i in datasource){
				var service = datasource[i];
				console.debug('ADD RESOURCE TO PALLETA ('+i+')');

				var templSpan = $('<span class="btn btn-'+(service.color || 'warning')+' glyphicon glyphicon-'+(service.icon || 'cloud')+'"></span>');
				templSpan
					.addClass('nonvisual');

				var templ = generateComponentDataSource(templSpan, service.name);

				
				accordion.add(service.name, service.category, templ);
				
				service.location = legend.attrPalleta;
				dao.updateCompDB(templ, service, legend.attrPalleta);				
				
			}
		};
		return self;
	}]);