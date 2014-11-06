inject.define("plugins.datasources.dataSul.controller", [function () {
    var self = {};
    self.scope = {};

	self.inject = {};
	self.inject['$http'] = '$http';
	self.inject['communicationDataSulService'] = 'communicationDataSulService';	

	self.variable = {};
	self.variable.list = "['num1', 'num2', 'num3']";

	self.scope.test = function() {
		alert('$context$');
		console.debug('$context$');
	};

	self.scope.list = function() {
		communicationDataSulService.list({
                    table : '$table$',
                    url : '$url$'
                }, function(data){                	
                	$scope.$context$.list = data;
                	$scope.$digest();
                }
        );
	};	

    return self;
}]);