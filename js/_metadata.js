var desenhador = desenhador || {};

(function(desenhador) {


	var setMetadata = function (nameService, metadata) {
		desenhador.metadata.metadata[nameService] = metadata;
	};
	var setArrays = function (nameService, arrays) {
		desenhador.metadata.arrays[nameService] = arrays;
	};
	var setModels = function (nameService, models) {
		desenhador.metadata.models[nameService] = models;
	};


	var update = function (target) {
		
		console.debug('UPDATE METADATA OBJ GLOBAL');
		desenhador.metadata.metadata = {};

		var comps;

		if(target){
			comps = $(target).find('.nonvisual');
		}else{
			comps = $('.des-datasource').find('.nonvisual');
		}

		for(var y = 0 ; y < comps.length ; y++){

			var comp = desenhador.util.eval($(comps[y]).attr('comp'));

			if(!comp)continue;		

			var nameService = comp.property.nameService;

			console.debug('ATUALIZANDO METADATA DE :'+nameService);
			if(comp.metadata)
				setMetadata(nameService, comp.metadata);
			if(comp.arrays)
				setArrays(nameService, comp.arrays);
			if(comp.models)
				setModels(nameService, comp.models);
		}
	};

	desenhador.metadata = {
		'update' : update,
		'metadata': {},
		'arrays': {},
		'models': {}
	};


})(desenhador);