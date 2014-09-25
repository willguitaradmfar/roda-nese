var desenhador = desenhador || {};

(function(desenhador) {	 

	

	var setMetadata = function (nameService, metadata) {		
		desenhador.metadata.metadata[nameService] = metadata;
	};
	
	var dynamic = function (_obj) {
		this.metadata = {};
		this.models = {};
		this.arrays = {};

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

		for(var i in this.metadata){
			var otype = this.metadata[i];
			var path = i;
			if(otype == 'object'){
				var _parts = path.split('.');
				this.models[_parts[_parts.length-1]] = '';				
			}
			if(otype == 'array'){
				var _parts = path.split('.');
				this.arrays[_parts[_parts.length-1]] = '';
			}
		}

		for(var y in this.models){
			var model = this.models[y];
			this.models[y] = {};
			this.models[y].before = {};
			this.models[y].after = {};
			for(var i in this.metadata){
				var otype = this.metadata[i];
				var path = i;
				if(otype != 'object' && otype != 'array'){
					if(path.indexOf(y+'.') > 0){
						var _parts = path.split(y+'.');						
						this.models[y].before[_parts[0]] = '';						
						this.models[y].after[_parts[1]] = otype;
					}					
				}
			}			
		}

		for(var y in this.arrays){
			var array = this.arrays[y];
			this.arrays[y] = {};
			this.arrays[y].before = {};
			this.arrays[y].after = {};
			for(var i in this.metadata){
				var otype = this.metadata[i];
				var path = i;
				if(otype != 'object' && otype != 'array'){
					if(path.indexOf(y+'.') > 0){
						var _parts = path.split(y+'.');						
						this.arrays[y].before[_parts[0]] = '';
						this.arrays[y].after[_parts[1]] = otype;
					}					
				}
			}			
		}
		
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