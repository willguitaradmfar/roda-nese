inject.define("palletas.resources.protheusRest.controller", [function () {
    var self = {};
    self.scope = {};

	self.inject = {};
	self.inject['$http'] = '$http';
	self.inject['soap'] = 'soap';	

	self.variable = {};
	self.variable.list = "['num1', 'num2', 'num3']";

	self.scope.test = function() {
		alert('$context$');
		console.debug('$context$');
	};

	self.scope.list = function() {
		soap.list({
                    CTABLE : '$table$',
                    CFIELDS : ''
                }, function(error, result){
                	if(error)
                		$scope.$context$.$messageError$ = error;
                	else
                    	$scope.$context$.$table$List = eval('('+result+')').Rows;
                }
        );
	};	

    return self;
}]);