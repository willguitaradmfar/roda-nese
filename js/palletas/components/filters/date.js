inject.define("palletas.components.filters.date", [function () {
    var self = {};

    self.filter = function(input) {
		return input ? input+' Filtrado' : 'não filtrado';
	};

    return self;
}]);