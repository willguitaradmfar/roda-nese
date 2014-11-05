inject.define("plugins.layouts.layout", [
			"plugins.layouts.cols.cols", 
		function (cols) {
		    var self = {};
		    self.cols = cols;    
		    return self;
		}]);