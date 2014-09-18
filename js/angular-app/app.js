angular.module('desenhador', [])
  .controller('desenhadorCtrl', ['$scope', function($scope) {
    console.debug('CHAMANDO CONTROLLER [desenhadorCtrl]');

    $scope.model = 'Defatult name';
    
  }]);