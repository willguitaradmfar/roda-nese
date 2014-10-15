inject.define("metadatas.metadata", ["utils.dao.component", function (dao) {
    var self = {};

    self.find = function (query, hand) {
		var nonvisuals = $('.des-datasource .nonvisual');
		nonvisuals.each(function (i, nonvisual) {
			var comp = dao.getCompDBById(nonvisual, 'data-comp-id');
			hand(comp.metadata);
		});
	};		

    return self;
}]);