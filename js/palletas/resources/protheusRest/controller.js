inject.define("palletas.resources.protheusRest.controller", [function () {
    var self = {};
    self.scope = {};

	self.inject = {};
	self.inject['$http'] = '$http';
	self.inject['rest'] = 'rest';
	self.inject['base64'] = 'base64';	

	self.variable = {};
	self.variable.list = "['num1', 'num2', 'num3']";

	self.scope.test = function() {
		alert('$context$');
		console.debug('$context$');
	};

	self.scope.list = function() {
		var config = {};
		config.table = '$table$';
		config.limit = $limit$;
		config.url = "$urlRest$";
		config.OPC = '$OPC$';

		config.success = function (data, status, headers, config) {		
			var decodado = base64.decode(data);			
			var result = eval('('+decodado+')');			
			$scope.$context$.$table$List = result.CONTENT.ROWS;
		};

		config.error = function (data, status, headers, config) {
			console.error(data, status, headers, config);
		};

		rest.data(config);
	};

	self.scope.save = function() {
		var config = {};
		config.table = '$table$';		
		config.url = "$urlRest$";		

		config.success = function (data, status, headers, config) {		
			var decodado = base64.decode(data);			
			var result = eval('('+decodado+')');			
			$scope.$context$.$table$List = result.CONTENT.ROWS;
		};

		config.error = function (data, status, headers, config) {
			console.error(data, status, headers, config);
		};

		rest.post(config, $scope.$context$.$table$);
	};

    return self;
}]);