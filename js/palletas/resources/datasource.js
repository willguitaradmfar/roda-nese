inject.define("palletas.resources.datasource", [
		"palletas.resources.protheusSoap.datasource", 
		"palletas.resources.static.datasource",
	function (protheusSoap, static) {
	    var self = {};
	    self.protheusSoap = protheusSoap;	    
	    self.static = static;	    
	    return self;
	}]);