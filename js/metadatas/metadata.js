inject.define("metadatas.metadata", [
		"utils.dao.compDB",
		"utils.legend",
	function (dao, legend) {
	    var self = {};

	    self.find = function (query, hand) {
			var nonvisuals = $('.des-datasource .nonvisual');
			nonvisuals.each(function (i, nonvisual) {
				var comp = dao.getCompDBById(nonvisual, legend.attrComp);
				hand(comp.metadata);
			});
		};

		 self.findSync = function (query) {
			var nonvisuals = $('.des-datasource .nonvisual');

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