var desenhador = desenhador || {};

(function(desenhador) {	 

	

	var setMetadata = function (nameService, metadata) {		
		desenhador.metadata.metadata[nameService] = metadata;
	};
	
	var dynamic = function (_obj) {
		this.metadata = {};

		this.nav = function (obj, parent) {
			for(var i in obj){
				var o = obj[i];
				var otype = (typeof o);

				if(!o)return;

				if(otype === 'object'){
					this.nav(o, parent+'.'+i);
					otype = (o.length ? 'array' : otype);
				}
				
				var path = (parent+'.'+i);
				path = path.replace(/\.\d+/g, '');
				this.metadata[path] = otype;				
			}
		};

		this.nav(_obj, 'root');
	};

	var update = function (target) {
		console.debug('UPDATE METADATA OBJ GLOBAL');
		desenhador.metadata.metadata = {};
		
		var comps;

		if(target){
			comps = $(target).find('.nonvisual');
		}else{
			comps = $('.datasource-container').find('.nonvisual');
		}			

		for(var y = 0 ; y < comps.length ; y++){

			var comp = desenhador.util.eval($(comps[y]).attr('comp'));

			if(!comp)continue;
			if(!comp.metadata)continue;

			var nameService = comp.property.nameService;

			console.debug('ATUALIZANDO METADATA DE :'+nameService);
			setMetadata(nameService, comp.metadata);			
		}
	};

	desenhador.metadata = {
		'dynamic' : dynamic,
		'update' : update,
		'metadata': {}
	};
			

})(desenhador);