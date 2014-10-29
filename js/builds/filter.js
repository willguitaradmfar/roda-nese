inject.define("builds.filter", [		
		"palletas.components.filters.filters",
	function (filters) {
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
			if(!filters) {
				console.warn('NÃO EXISTE FILTERS PARA COMPILAR');
			}

			for(var i in filters){
				var filter = filters[i];
				var filterName = i;
				setFunctions(filterName, filter.filter);				
			}

			for(var i in filters){
				var filter = filters[i];
				var filterName = i;
				for(var ii in filter.inject){
					var inject = filter.inject[ii];
					var injectName = ii;
					setInject(ii, inject);	
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