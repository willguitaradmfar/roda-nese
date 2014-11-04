inject.define("builds.directive", [
		"utils.dao.compDB", 
		"utils.processTemplate", 
		"utils.legend",
	function (dao, processTemplate, legend) {
	    var self = {};

	    var struct = {};
		struct._functions = {};

		var setFunctions = function (name, _function) {
			console.debug('SET FUNCTIONS DIRECTIVE : '+name);
			struct._functions[name] = _function.toString();
		};	

		self.update = function (target) {

			console.debug('UPDATE DIRECTIVE OBJ GLOBAL');

			var comps;

			if(target){
				console.debug('FOI PASSADO UM ALVO PARA COMPOR O CONTEUDO HTML');			
				comps = $(target).find('.component');
			}else{
				console.debug('NÃO FOI PASSADO UM ALVO');
				comps = $('#project[data-body-project] [data-body-component]');
			}	

			for(var y = 0 ; y < comps.length ; y++){			

				var comp = dao.getCompDBById($(comps[y]), legend.attrComp);

				if(!comp)continue;
				
				if(!comp.directive){
					console.warn('COMPONENTE '+comp.name+' NAO TEM IMPLEMENTACAO DE DIRECTIVE');
					continue;
				}

				var scope = comp.directive.scope;
				for(var i in scope){
					var s = scope[i];
					console.debug(processTemplate.processTemplateParam(s, comp.property));
					setFunctions(i, processTemplate.processTemplateParam(s, comp.property));
				}			
			}
		};

		self.makeDirective = function (target) {
			self.update(target);
			return _makeDirective();
		};

		var _makeDirective = function () {
			var bodyDirective = "";
			
			for(var i in struct._functions){			
					var _function = struct._functions[i];
					bodyDirective += '\nangularApp.directive(\''+i+'\', '+_function+');';
			}

			console.debug(bodyDirective);
			return bodyDirective;
		};

	    return self;
	}]);