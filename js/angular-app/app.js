var desenhador = desenhador || {};
desenhador.controller = desenhador.controller || {};

desenhador.controller = (function () {

	var struct = {}
	struct._injects = {};

	//DEFAULTS
	struct._injects['$scope'] = '$scope';

	struct._functions = {};
	struct._variable = {};	

	var setInject = function (name, _inject) {
		console.debug('ADD INJECTS : '+name);
		struct._injects[name] = _inject;
	};

	var setFunctions = function (name, _function) {
		console.debug('ADD FUNCTIONS : '+name);
		struct._functions[name] = _function.toString();
	};

	var setVariables = function (name, _variable) {
		console.debug('ADD VARIABLES : '+name);
		struct._variable[name] = _variable;
	};

	var removeInject = function (name, _inject) {
		console.debug('REMOVE INJECTS : '+name);
		delete struct._injects[name];
	};

	var removeFunctions = function (name, _function) {
		console.debug('REMOVE FUNCTIONS : '+name);
		delete struct._functions[name];
	};

	var removeVariables = function (name, _variable) {
		console.debug('REMOVE VARIABLES : '+name);
		delete struct._variable[name];
	};

	var makeController = function () {
		var bodyController = "angular.module('desenhador', [])";
		var inj = "\n\t.controller('desenhadorCtrl', [";
		for(var i in struct._injects){
			inj += "'"+struct._injects[i]+"', ";
		}
		
		bodyController += inj;

		inj = '';
		for(var i in struct._injects){
			inj += ""+struct._injects[i]+", ";
		}

		bodyController += 'function('+inj.substring(0, inj.length-2)+') {';

		bodyController += "\n\t\tconsole.debug('CHAMANDO CONTROLLER [desenhadorCtrl]');";

		for(var i in struct._variable){
			var variable = struct._variable[i];
			bodyController += '\n\t\t\t$scope.'+i+' = '+variable+';';
		}

		for(var i in struct._functions){
			var _function = struct._functions[i];
			bodyController += '\n\t\t\t$scope.'+i+' = '+_function+';';
		}

		bodyController += '\n\t}])';

		return bodyController;
	};

	return {
		'setInject' : setInject,
		'setFunctions' : setFunctions,
		'setVariables' : setVariables,
		'removeInject' : removeInject,
		'removeFunctions' : removeFunctions,
		'removeVariables' : removeVariables,
		'makeController' : makeController
	};
})();