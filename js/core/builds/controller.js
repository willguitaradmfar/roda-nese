inject.define("core.builds.controller", [
		"core.utils.dao.compDB", 
		"core.utils.processTemplate", 
		"core.utils.legend",
	function (dao, processTemplate, legend) {
	    var self = {};
	    var struct = {};
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
					var o = {};
					o.id = i+' >> '+ii;
					o.value = i+'.'+ii+'()';
					o.label = i+' >> '+ii;

					_functions.push(o);
				}
			}
			return _functions;
		};

		self.update = function (target) {

			console.debug('UPDATE CONTROLLER OBJ GLOBAL');

			var comps;

			if(target){
				console.debug('FOI PASSADO UM ALVO PARA COMPOR O CONTEUDO HTML');			
				comps = $(target).find('#datasource [data-body-component-datasource]');
			}else{
				console.debug('NÃO FOI PASSADO UM ALVO');
				comps = $('#datasource [data-body-component-datasource]');
			}

			struct._functions = {};
			struct._variable = {};		

			for(var y = 0 ; y < comps.length ; y++){			

				var comp = dao.getCompDBById($(comps[y]), legend.attrComp);

				if(!comp)continue;

				if(!comp.controller){
					console.debug('COMPONENTE '+comp.name+' NAO TEM IMPLEMENTACAO DE CONTROLLER');
					continue;
				}

				var context = comp.property.context.val;

				var scope = comp.controller.scope;
				for(var i in scope){
					var s = scope[i];
					console.debug(processTemplate.processTemplateParam(s, comp.property));
					setFunctions(context, i, processTemplate.processTemplateParam(s, comp.property));
				}

				var inject = comp.controller.inject;			
				for(var i in inject){
					var inj = inject[i];				
					setInject(i, inj);
				}

				var variable = comp.controller.variable;			
				for(var i in variable){
					var v = variable[i];				
					setVariables(context, i, v);
				}
			}
		};

		self.makeController = function (target) {
			self.update(target);
			return _makeController();
		};

		var _makeController = function () {
			var bodyController = "\n\nangularApp";
			bodyController += "\n\t.controller('desenhadorCtrl', [";		

			bodyController += Object.keys(struct._injects).map(function(a, i){return '\''+a+'\''}).toString();		

			bodyController += ', function('+Object.keys(struct._injects).toString()+') {';

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

			bodyController += '\n\t\t\t$scope.set = ' +  (function (_m, target) {
				//debugger;

				var _f = target.split('.');

				var re = function(_f, target){
					var ff = _f.shift();
					if(target[ff]){
						if(_f.length > 0){
							re(_f, target[ff])
						}else{
							target[ff] = _m;
						}
					}else{
						target[ff] = _m;
					}
				};

				re(_f, $scope);

				
			}).toString();

			bodyController += '\n\t}]);';

			return bodyController;
		};
		
	    return self;
	}]);