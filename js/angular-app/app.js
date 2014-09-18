angular.module('desenhador', []).controller('desenhadorCtrl', ['$scope', 'User', function($scope, User) {
	console.debug('CHAMANDO CONTROLLER [desenhadorCtrl]');

	User.get(function (data) {
		$scope.models = data;	
	});
    
}]);