inject.define("resources.controller.static", [function () {
    var self = {};
    self.scope = {};

	self.inject = {};
	self.inject['$http'] = '$http';

	self.variable = {};
	self.variable.carroList = "[]";

	self.scope.list = function() {		
		if(!$scope.$context$)$scope.$context$ = {};
        $scope.$context$.$collection$ = [
	            {nome  : 'Fusca', power : 1, modelo : {nome : 'Fusca', marca : {nome : 'Volksvagem'}}},
	            {nome  : 'FOX', power : 14, modelo : {nome : 'FOX CITY', marca : {nome : 'Volksvagem'}}},
	            {nome  : 'Corsa', power : 31, modelo : {nome : 'Corsa', marca : {nome : 'Chevrolet'}}},
	            {nome  : 'Uno', power : 66, modelo : {nome : 'Uno', marca : {nome : 'Fiat'}}},
	            {nome  : 'Brasilia', power : 11, modelo : {nome : 'Brasilia', marca : {nome : 'Volksvagem'}}},
	            {nome  : 'i30', power : 80, modelo : {nome : 'i30', marca : {nome : 'Hyundai'}}},
	            {nome  : 'Gol', power : 22, modelo : {nome : 'Gol 1.0', marca : {nome : 'Volksvagem'}}}
	        ];
	};
    return self;
}]);