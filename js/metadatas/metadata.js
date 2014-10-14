inject.define("metadatas.metadata", ["utils.util", function (util) {
    var self = {};

    self.find = function (query, hand) {
		var nonvisuals = $('.des-datasource .nonvisual');
		nonvisuals.each(function (i, nonvisual) {
			var comp = util.getCompDBById(nonvisual, 'data-comp-id');
			hand(comp.metadata);
		});
	};		

    return self;
}]);