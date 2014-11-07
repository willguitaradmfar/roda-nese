inject.define("plugins.exports.exports", [
		"plugins.exports.previewer",
		"plugins.exports.zip",
	function (previewer, zip) {
	    var self = {};
	    self.previewer = previewer;
	    self.zip = zip;
	    return self;
	}]);