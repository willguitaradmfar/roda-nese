(function(global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.resources = global.desenhador.resources || {};
	global.desenhador.resources.protheusSoap = global.desenhador.resources.protheusSoap || {};	
	global.desenhador.resources.protheusSoap.controller = global.desenhador.resources.protheusSoap.controller || {};	

	var self = global.desenhador.resources.protheusSoap.controller;

	self.scope = {};

	self.inject = {};
	self.inject['$http'] = '$http';

	self.variable = {};
	self.variable.list = "['num1', 'num2', 'num3']";

	self.scope.test = function() {
		alert('$context$');
		console.debug('$context$');
	};

	self.scope.list = function() {
		$scope.$context$.$table$List = [{
			A1_FILIAL : 'TOTVS',
			A1_LOJA : 'L1',
			A1_COD : '00001'
		}];		
	};	
})(window);