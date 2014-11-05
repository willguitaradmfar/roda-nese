inject.define("plugins.datasources.datasource", [
		"plugins.datasources.protheusSoap.datasource",
		"plugins.datasources.static.datasource",
		"plugins.datasources.protheusRest.datasource",
	function (protheusSoap, static, protheusRest) {
	    var self = {};
	    self.protheusSoap = protheusSoap;	    
	    self.static = static;
	    self.protheusRest = protheusRest;
	    return self;
	}]);