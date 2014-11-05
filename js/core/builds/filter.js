inject.define("core.builds.filter", [
		"core.utils.dao.compDB",
		"core.utils.processTemplate", 
		"core.utils.legend",
	function (dao, processTemplate, legend) {
	    var self = {};

	    var struct = {};
	    struct._injects = {};
		struct._functions = {};

		var setInject = function (name, _inject) {
			console.debug('SET INJECTS FILTER : '+name);
			struct._injects[name] = _inject;
		};

		var setFunctions = function (name, _function) {
			console.debug('SET FUNCTIONS FILTER : '+name);
			struct._functions[name] = _function.toString();
		};

		self.update = function (target) {
			console.debug('UPDATE FILTERS OBJ GLOBAL');
			var comps;

			if(target){
				console.debug('FOI PASSADO UM ALVO PARA COMPOR O CONTEUDO HTML');			
				comps = $(target).find('#datasource [data-body-component-datasource]');
			}else{
				console.debug('NÃO FOI PASSADO UM ALVO');
				comps = $('#datasource [data-body-component-datasource]');
			}

			for(var y = 0 ; y < comps.length ; y++){			

				var comp = dao.getCompDBById($(comps[y]), legend.attrComp);

				if(!comp)continue;
				
				if(!comp.filter){
					console.debug('COMPONENTE '+comp.name+' NAO TEM IMPLEMENTACAO DE FILTERS');
					continue;
				}

				var scope = comp.filter.scope;
				for(var i in scope){
					var s = scope[i];					
					setFunctions(i, s);
				}

				var inject = comp.filter.inject;
				for(var i in inject){
					var s = inject[i];
					setInject(i, s);
				}
			}			
		};

		self.makeFilter= function (target) {
			self.update(target);
			return _makeFilter();
		};

		var _makeFilter = function () {
			var bodyFilter = "";
			
			for(var i in struct._functions){			
					var _function = struct._functions[i];
					var filterName = i;
					bodyFilter += '\nangularApp.filter(\''+filterName+'\', function('+Object.keys(struct._injects).toString()+'){ return '+_function+'; });';
			}

			console.debug(bodyFilter);
			return bodyFilter;
		};

	    return self;
	}]);