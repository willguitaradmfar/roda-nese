inject.define("palletas.resources.static.controller", [function () {
    var self = {};
    self.scope = {};

	self.inject = {};
	self.inject['$http'] = '$http';

	self.variable = {};
	self.variable.carroList = "[]";

	self.scope.list = function() {		
		if(!$scope.$context$)$scope.$context$ = {};
        $scope.$context$.carroList = [
	            {nome  : 'Fusca', dtcreated : new Date(), power : 1, modelo : {nome : 'Fusca', marca : {nome : 'Volksvagem'}}},
	            {nome  : 'FOX', dtcreated : new Date(), power : 14, modelo : {nome : 'FOX CITY', marca : {nome : 'Volksvagem'}}},
	            {nome  : 'Corsa', dtcreated : new Date(), power : 31, modelo : {nome : 'Corsa', marca : {nome : 'Chevrolet'}}},
	            {nome  : 'Uno', dtcreated : new Date(), power : 66, modelo : {nome : 'Uno', marca : {nome : 'Fiat'}}},
	            {nome  : 'Brasilia', dtcreated : new Date(), power : 11, modelo : {nome : 'Brasilia', marca : {nome : 'Volksvagem'}}},
	            {nome  : 'i30', dtcreated : new Date(), power : 80, modelo : {nome : 'i30', marca : {nome : 'Hyundai'}}},
	            {nome  : 'Gol', dtcreated : new Date(), power : 22, modelo : {nome : 'Gol 1.0', marca : {nome : 'Volksvagem'}}}
	        ];
	};
    return self;
}]);