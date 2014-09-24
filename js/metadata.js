var desenhador = desenhador || {};

(function(desenhador) {
	desenhador.metadata = desenhador.metadata || {};	
	
	desenhador.metadata = function (_obj) {
		var metadado = {};

		var nav = function (obj, parent) {			
			for(var i in obj){
				var o = obj[i];
				var otype = (typeof o);

				if(!o)return;

				if(otype === 'object'){
					nav(o, parent+'.'+i);			
					otype = (o.length ? 'array' : otype);
				}
				
				
				var path = (parent+'.'+i);
				path = path.replace(/\.\d+/g, '');
				metadado[path] = otype;
			}
		};	

		nav(_obj, 'root');

		return metadado;
	};	

	console.log(desenhador);
	
})(desenhador);