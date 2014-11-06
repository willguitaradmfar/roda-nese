inject.define("plugins.datasources.datasource", [
		"plugins.datasources.protheusSoap.datasource",
		"plugins.datasources.static.datasource",
		"plugins.datasources.protheusRest.datasource",
		"plugins.datasources.dataSul.datasource",
	function (protheusSoap, static, protheusRest, dataSul) {
	    var self = {};
	    self.protheusSoap = protheusSoap;
	    self.static = static;
	    self.protheusRest = protheusRest;
	    self.dataSul = dataSul;
	    return self;
	}]);