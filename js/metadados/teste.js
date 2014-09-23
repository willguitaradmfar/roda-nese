var _o = {
	name : 'William', 
	age : 28, 
	end : {
		rua : 'Rua amazonita, 54'
	},
	filhos : [
		{
			name : 'Alexandre',
			brinquedos : [{
					name : 'carro',
				},{
					name : 'caminhão'
				}]
		}
	]
};

var metadado = {};

var nav = function (obj, parent) {
	for(var i in obj){
		var o = obj[i];
		var otype = (typeof o);

		if(otype === 'object'){
			nav(o, parent+'.'+i);			
			otype = (o.length ? 'array' : otype);
		}
		
		
		var path = (parent+'.'+i);
		path = path.replace(/\.\d/g, '');
		metadado[path] = otype;
	}
}



nav(_o, 'root');


console.log(metadado);