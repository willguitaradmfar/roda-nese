inject.define("builds.service", [
		"utils.dao.compDB", 
		"utils.processTemplate", 
		"utils.legend",
	function (dao, processTemplate, legend) {
	    var self = {};

	    var struct = {};	
		struct._functions = {};		

		var setFunctions = function (name, _function) {
			console.debug('SET FUNCTIONS SERVICE : '+name);
			struct._functions[name] = _function.toString();
		};	

		self.update = function (target) {

			console.debug('UPDATE SERVICE OBJ GLOBAL');

			var comps;

			if(target){
				console.debug('FOI PASSADO UM ALVO PARA COMPOR O CONTEUDO HTML');			
				comps = $(target).find('.nonvisual');
			}else{
				console.debug('NÃO FOI PASSADO UM ALVO');
				comps = $('.des-datasource').find('.nonvisual');
			}	

			for(var y = 0 ; y < comps.length ; y++){			

				var comp = dao.getCompDBById($(comps[y]), legend.attrComp);

				if(!comp)continue;
				
				if(!comp.service){
					console.debug('COMPONENTE '+comp.name+' NAO TEM IMPLEMENTACAO DE SERVICE');
					continue;
				}

				var scope = comp.service.scope;
				for(var i in scope){
					var s = scope[i];
					console.debug(processTemplate.processTemplateParam(s, comp.property));
					setFunctions(i, processTemplate.processTemplateParam(s, comp.property));
				}

			}
		};

		self.makeService = function (target) {
			self.update(target);
			return _makeService();
		};

		var _makeService = function () {
			var bodyService = "";
			
			for(var i in struct._functions){			
					var _function = struct._functions[i];
					bodyService += '\nangularApp.factory(\''+i+'\', '+_function+');';
			}

			console.debug(bodyService);
			return bodyService;
		};

	    return self;
	}]);