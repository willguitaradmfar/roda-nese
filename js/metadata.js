var desenhador = desenhador || {};

(function(desenhador) {
	desenhador.metadata = desenhador.metadata || {};
	
	desenhador.metadata = function (_obj) {
		this.metadado = {};

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
				this.metadado[path] = otype;
			}
		};
		this.nav(_obj, 'root');
	};
	
})(desenhador);