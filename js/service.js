var desenhador = desenhador || {};

(function (desenhador) {
	var struct = {};	
	struct._functions = {};

	var setFunctions = function (name, _function) {
		console.debug('SET FUNCTIONS CONTROLLER : '+name);		

		struct._functions[name] = _function.toString();
	};	

	var update = function (target) {

		console.debug('UPDATE CONTROLLER OBJ GLOBAL');

		var comps;

		if(target){
			console.debug('FOI PASSADO UM ALVO PARA COMPOR O CONTEUDO HTML');			
			comps = $(target).find('.nonvisual');
		}else{
			console.debug('NÃO FOI PASSADO UM ALVO');
			comps = $('.des-datasource').find('.nonvisual');
		}	

		for(var y = 0 ; y < comps.length ; y++){			

			var comp = desenhador.util.getCompDBById($(comps[y]), 'data-comp-id');

			if(!comp)continue;

			var scope = comp.service.scope;
			for(var i in scope){
				var s = scope[i];
				console.debug(desenhador.util.processTemplateParam(s, comp.property));
				setFunctions(i, desenhador.util.processTemplateParam(s, comp.property));
			}			
		}
	};

	var makeService = function (target) {
		update(target);
		return _makeService();
	};

	var _makeService = function () {
		var bodyService = "\n\nangularApp";
		
		for(var i in struct._functions){			
				var _function = struct._functions[i];
				bodyService += '\n\t.factory(\''+i+'\', '+_function+')';
		}

		console.debug(bodyService);
		return bodyService;
	};

	desenhador.service =  {
		'update' : update,		
		'makeService' : makeService
	};
})(desenhador);