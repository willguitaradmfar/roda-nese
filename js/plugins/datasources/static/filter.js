inject.define("plugins.datasources.static.filter", [function () {
    var self = {};

    self.inject = {}; 
    self.inject.$filter = '$filter';
    self.inject.$date = '$date';

    self.scope = {};

    self.scope.hello = function () {
    	console.log('teste');
    };

    return self;
}]);