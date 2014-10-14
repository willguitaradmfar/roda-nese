inject.define("resources.datasource", [
		"resources.datasource.protheusSoap", 
		"resources.datasource.static", 
		"resources.datasource.strongLoopBack",
	function (protheusSoap, static, strongLoopBack) {
	    var self = {};
	    self.protheusSoap = protheusSoap;
	    self.strongLoopBack = strongLoopBack;
	    self.static = static;	    
	    return self;
	}]);