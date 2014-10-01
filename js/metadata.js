(function(global, undefined) {
	var db = TAFFY();	
	global.desenhador = global.desenhador || {};
	global.desenhador.metadata = global.desenhador.metadata || {};

	var insert = function (doc) {
		 db.insert(doc);
	};
		
	var find = function (query, hand) {
		db(query).each(hand);
	};

	var findByResource = function (resource, hand) {
		db({resource : resource}).each(hand);
	};

	var count = function (query) {
		return db(query).count();
	};

	var update = function (query, _update) {
		return db(query).update(_update);
	};

	var process = function (obj) {

		if(typeof(obj) == 'string' && obj.substring(0,1) == ':'){			
			/*console.debug(obj);
			console.debug(obj.replace(/^:(\w*)\.{0,1}(.*)$/, ' model: $1, field: $2'));
			console.debug('--------------');*/
		}

		if(obj == null || typeof(obj) != 'object')
	        return obj;

	    var temp = obj.constructor(); // changed

	    for(var key in obj) {
	        if(obj.hasOwnProperty(key)) {	        	
	            temp[key] = process(obj[key]);
	        }
	    }
	    return temp;
	};

	var Metadata = function (_doc) {
		var doc = {};
		//MODELO DE DADOS
		doc.resource = '';
		doc.models = '';		
		doc.actions = '';

		this.set = function (key, value) {
			if(!key) throw 'Key not defined';
			if(doc[key] === undefined) throw 'Campo '+key+' inexistente';
			doc[key] = value;
			return this;
		};		

		this.save = function () {
			if(count(doc) > 1){
				console.warn('EXISTE MAIS DE UM OBJETO REPETIDO');
			}else if(count(doc) == 0){
				insert(doc);
			}else if(count(doc) == 1){
				update(doc, doc);
			}
			return this;
		};

		for (var key in _doc) {
	    	this.set(key, _doc[key]);
	    }
	};

	global.desenhador.metadata.factory = function (doc) {
		return new Metadata(doc);
	};

	global.desenhador.metadata.find = find;
	global.desenhador.metadata.findByResource = findByResource;
	global.desenhador.metadata.process = process;
	
})(window);


//###################################################################################################//
{
	var models = {};
	models.carro = {	
		nome : {
			type : 'string',
			required : true
		},
		modelo : {
			type : ':modelo'			
		}	
	};

	models.modelo = {	
		nome : {
			type : 'string',
			required : true
		},
		marca : {
			type : ':marca'
		}
	};

	models.marca = {
		nome : {
			type : 'string',
			required : true
		}
	};

	models.message = {
		message : {
			type : 'string'
		}
	}

	var actions = {};
	actions.save = {
		model : ':carro',
		parameter : [[':carro'], [':marca']],
		result : {
			type : 'object',
			model : ':message'
		},
		messages : {
			'200' : 'Veículo criado com sucesso',
			'erroServer' : 'Ocorreu um erro no servidor',
			'500' : 'Erro'
		}
	};

	actions.update = {
		model : ':carro',
		parameter : [[':carro.id', ':carro']],
		result : {
			type : 'object',
			model : ':message'
		},
		messages : {
			'200' : 'Veículo atualizado com sucesso',		
			'500' : 'Erro'
		}
	};

	actions.list = {
		model : ':carro',
		parameter : [[':carro.modelo.nome']],
		result : {
			type : 'array',
			model : ':carro'
		},
		messages : {				
			'500' : 'Erro'
		}
	};

	desenhador.metadata.factory()
		.set('resource', 'LoopBack1')
		.set('models', models)
		.set('actions', actions)
		.save();
}

{
	var models = {};
	models.pessoa = {	
		nome : {
			type : 'string',
			required : true
		},
		idade : {
			type : 'number',
			required : true
		},
		end : {
			type : ':end'			
		}	
	};

	models.end = {
		nome : {
			type : 'string',
			required : true
		},
		cidade : {
			type : ':cidade'
		}
	};

	models.cidade = {
		nome : {
			type : 'string',
			required : true
		}
	};

	models.message = {
		message : {
			type : 'string'
		}
	}

	var actions = {};
	actions.save = {
		model : ':pessoa',
		parameter : [[':pessoa']],
		result : {
			type : 'object',
			model : ':message'
		},
		messages : {
			'200' : 'Pessoa criada com sucesso',
			'erroServer' : 'Ocorreu um erro no servidor',
			'500' : 'Erro'
		}
	};

	actions.update = {
		model : ':pessoa',
		parameter : [[':pessoa.id', ':pessoa']],
		result : {
			type : 'array',
			model : ':message'
		},
		messages : {
			'200' : 'Pessoa atualizada com sucesso',		
			'500' : 'Erro'
		}
	};

	actions.list = {
		model : ':pessoa',
		parameter : [[':pessoa.end.nome']],
		result : {
			type : 'array',
			model : ':pessoa'
		},
		messages : {			
			'500' : 'Erro'
		}
	};

	desenhador.metadata.factory()
		.set('resource', 'LoopBack2')
		.set('models', models)
		.set('actions', actions)
		.save();
}

desenhador.metadata.find({}, function (doc) {
	desenhador.metadata.process(doc);
	//console.log(doc);
});



