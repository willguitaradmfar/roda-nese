angular.module('desenhador', [])
  .controller('desenhadorCtrl', ['$scope', function($scope) {
    console.debug('CHAMANDO CONTROLLER [desenhadorCtrl]');

    $scope.models = [];

    $scope.models.push(
    	{name : 'Lucas', age : 22, rg : '41.555'},
    	{name : 'Ana', age : 26, rg : '654321'},
    	{name : 'José', age : 32, rg : '123456'},
    	{name : 'Marcos', age : 52, rg : '2135'});
    
  }]);