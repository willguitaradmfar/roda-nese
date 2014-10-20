inject.define("palletas.resources.datasource", [
		"palletas.resources.protheusSoap.datasource",
		"palletas.resources.static.datasource",
		"palletas.resources.protheusRest.datasource",
	function (protheusSoap, static, protheusRest) {
	    var self = {};
	    self.protheusSoap = protheusSoap;	    
	    self.static = static;
	    self.protheusRest = protheusRest;
	    return self;
	}]);