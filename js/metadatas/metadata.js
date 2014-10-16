inject.define("metadatas.metadata", [
		"utils.dao.component",
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

	    return self;
	}]);