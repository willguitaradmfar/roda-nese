inject.define("core.properties.metadata", [
		"core.utils.dao.compDB",
		"core.utils.legend",
	function (dao, legend) {
	    var self = {};
	    
		 self.findSync = function () {		 	
			var nonvisuals = $('#datasource [data-body-component-datasource]');
			var metadados = [];
			for(var i = 0, len = nonvisuals.length ; i < len ; i++){
				var nonvisual = nonvisuals[i];
				var comp = dao.getCompDBById(nonvisual, legend.attrComp);
				metadados.push(comp.metadata);
			}
			return metadados;
		};
	    return self;
	}]);