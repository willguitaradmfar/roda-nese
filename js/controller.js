var desenhador = desenhador || {};


(function (desenhador) {

	desenhador.controller = desenhador.controller || {};

	var struct = {}
	struct._injects = {};

	//DEFAULTS
	struct._injects['$scope'] = '$scope';

	struct._functions = {};
	struct._variable = {};

	var setInject = function (name, _inject) {
		console.debug('SET INJECTS CONTROLLER : '+name);
		struct._injects[name] = _inject;
	};

	var setFunctions = function (nameService, name, _function) {
		console.debug('SET FUNCTIONS CONTROLLER : '+name);
		if(!struct._functions[nameService])struct._functions[nameService] = {};

		struct._functions[nameService][name] = _function.toString();
	};

	var setVariables = function (nameService, name, _variable) {
		console.debug('SET VARIABLES CONTROLLER : '+name);
		if(!struct._variable[nameService])struct._variable[nameService] = {};
		struct._variable[nameService][name] = _variable;
	};
	
	var getFunctions = function() {
		console.debug('GET ALL FUNCTIONS CONTROLLER');
		var _functions = [];		
		for(var i in struct._functions){
			for(var ii in struct._functions[i]){
				/*var o = {};
				o.value = i+'.'+ii+'()';
				o.label = i+' >> '+ii+'()';*/			

				_functions.push(i+'.'+ii);
			}
		}
		return _functions;
	};

	var makeController = function (target) {

		var comps;

		if(target){
			comps = $(target).find('.nonvisual');
		}else{
			comps = $('.datasource-container').find('.nonvisual');
		}

		struct._functions = {};
		struct._variable = {};

		for(var y = 0 ; y < comps.length ; y++){

			var comp = desenhador.util.eval($(comps[y]).attr('comp'));
			if(!comp)continue;
			var nameService = comp.property.nameService;

			for(var i in comp.controller._injects){
				var _inject = comp.controller._injects[i];
				setInject(i, _inject);
			}

			for(var i in comp.controller._variables){
				var _variable = comp.controller._variables[i];
				setVariables(nameService, i, _variable);
			}

			for(var i in comp.controller._functions){
				var _function = comp.controller._functions[i];
				setFunctions(nameService, i, _function);
			}				
		}		

		return _makeController();
	};

	var _makeController = function () {
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

		var services = {};
		
		//MERGE DE FUNCTION E VARIABLE
		for(var i in struct._variable){			
			services[i] = {};
		}
		for(var i in struct._functions){			
			services[i] = {};
		}

		for(var i in services){
			var service = services[i];
			bodyController += '\n\t\t\t$scope.'+i+' = {}';
		}		

		for(var i in struct._variable){			
			for(var ii in struct._variable[i]){
				var variable = struct._variable[i][ii];
				bodyController += '\n\t\t\t$scope.'+i+'.'+ii+' = '+variable+';';
			}
		}

		for(var i in struct._functions){
			for(var ii in struct._functions[i]){
				var _function = struct._functions[i][ii];
				bodyController += '\n\t\t\t$scope.'+i+'.'+ii+' = '+_function+';';
			}
		}

		bodyController += '\n\t}])';

		console.debug(bodyController);

		return bodyController;
	};

	desenhador.controller =  {
		'setInject' : setInject,
		'setFunctions' : setFunctions,
		'setVariables' : setVariables,
		'getFunctions' : getFunctions,
		'makeController' : makeController
	};
})(desenhador);