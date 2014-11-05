inject.define("plugins.datasources.static.controller", [function () {
    var self = {};
    self.scope = {};

	self.inject = {};
	self.inject['$http'] = '$http';

	self.variable = {};
	self.variable.list = "[]";

	self.scope.save = function(carro) {
		var index = -1;
		for(var i in $scope.$context$.list){
			var element = $scope.$context$.list[i];
			if(element.$$hashKey == carro.$$hashKey){
				index = i;
			}
		}
		if(index >= 0){
			$scope.$context$.list[index] = carro;	
		}else{
			$scope.$context$.list.push(carro);
		}

		$scope.$context$.carro = {};
	};

	self.scope.remove = function(carro) {
		var index = -1;
		for(var i in $scope.$context$.list){
			var element = $scope.$context$.list[i];
			if(element.$$hashKey == carro.$$hashKey){
				index = i;
			}
		}
		$scope.$context$.list.splice(index, 1);		
	};

	self.scope.list = function() {		
		if(!$scope.$context$)$scope.$context$ = {};

		var rdm = function () {
			var value = Math.round(Math.random()*100);

			return Math.round(value * 1000 ) / 10000;
		}

        $scope.$context$.list = [{
		   nome: 'Fusca',
		   revisoes: [{
		      data: new Date(),
		      descricao: 'rev001 Fusca',
		      codigo: '001',
		      valor : rdm()
		   }, {
		      data: new Date(),
		      descricao: 'rev002 Fusca',
		      codigo: '002',
		      valor : rdm()
		   }, {
		      data: new Date(),
		      descricao: 'rev003 Fusca',
		      codigo: '003',
		      valor : rdm()
		   }, {
		      data: new Date(),
		      descricao: 'rev004 Fusca',
		      codigo: '004',
		      valor : rdm()
		   }],
		   dtcreated: new Date(),
		   power: "1",
		   modelo: {
		      nome: 'Fusca',
		      marca: {
		         nome: 'Volksvagem'
		      }
		   }
		}, {
		   nome: 'FOX',
		   revisoes: [{
		      data: new Date(),
		      descricao: 'rev001 FOX',
		      codigo: '001',
		      valor : rdm()
		   }, {
		      data: new Date(),
		      descricao: 'rev002 FOX',
		      codigo: '002',
		      valor : rdm()
		   }],
		   dtcreated: new Date(),
		   power: "14",
		   modelo: {
		      nome: 'FOX CITY',
		      marca: {
		         nome: 'Volksvagem'
		      }
		   }
		}, {
		   nome: 'Corsa',
		   revisoes: [{
		      data: new Date(),
		      descricao: 'rev001 Corsa',
		      codigo: '001',
		      valor : rdm()
		   }, {
		      data: new Date(),
		      descricao: 'rev002 Corsa',
		      codigo: '002',
		      valor : rdm()
		   }, {
		      data: new Date(),
		      descricao: 'rev003 Corsa',
		      codigo: '003',
		      valor : rdm()
		   }],
		   dtcreated: new Date(),
		   power: "31",
		   modelo: {
		      nome: 'Corsa',
		      marca: {
		         nome: 'Chevrolet'
		      }
		   }
		}, {
		   nome: 'Uno',
		   revisoes: [{
		      data: new Date(),
		      descricao: 'rev001 Uno',
		      codigo: '001',
		      valor : rdm()
		   }, {
		      data: new Date(),
		      descricao: 'rev002 Uno',
		      codigo: '002',
		      valor : rdm()
		   }],
		   dtcreated: new Date(),
		   power: "66",
		   modelo: {
		      nome: 'Uno',
		      marca: {
		         nome: 'Fiat'
		      }
		   }
		}, {
		   nome: 'Brasilia',
		   revisoes: [{
		      data: new Date(),
		      descricao: 'rev001 Brasilia',
		      codigo: '001',
		      valor : rdm()
		   }, {
		      data: new Date(),
		      descricao: 'rev002 Brasilia',
		      codigo: '002',
		      valor : rdm()
		   }],
		   dtcreated: new Date(),
		   power: "11",
		   modelo: {
		      nome: 'Brasilia',
		      marca: {
		         nome: 'Volksvagem'
		      }
		   }
		}, {
		   nome: 'i30',
		   revisoes: [{
		      data: new Date(),
		      descricao: 'rev001 i30',
		      codigo: '001',
		      valor : rdm()
		   }, {
		      data: new Date(),
		      descricao: 'rev002 i30',
		      codigo: '002',
		      valor : rdm()
		   }, {
		      data: new Date(),
		      descricao: 'rev003 i30',
		      codigo: '003',
		      valor : rdm()
		   }],
		   dtcreated: new Date(),
		   power: "80",
		   modelo: {
		      nome: 'i30',
		      marca: {
		         nome: 'Hyundai'
		      }
		   }
		}, {
		   nome: 'Gol',
		   revisoes: [{
		      data: new Date(),
		      descricao: 'rev001 Gol',
		      codigo: '001',
		      valor : rdm()
		   }, {
		      data: new Date(),
		      descricao: 'rev002 Gol',
		      codigo: '002',
		      valor : rdm()
		   }],
		   dtcreated: new Date(),
		   power: "22",
		   modelo: {
		      nome: 'Gol 1.0',
		      marca: {
		         nome: 'Volksvagem'
		      }
		   }
		}];
	};
    return self;
}]);