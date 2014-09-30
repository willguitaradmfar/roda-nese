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

	var count = function (query) {
		return db(query).count();
	};

	var update = function (query, _update) {
		return db(query).update(_update);
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
	
})(window);


//###################################################################################################//

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

var actions = {};
actions.save = {
	model : ':carro',
	parameter : [[':carro']],
	result : {
		type : 'object',
		model : {
			message : 'bla bla bla'
		}
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
		model : {
			message : 'atualizado'
		}
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
		'200' : 'Veículo atualizado com sucesso',		
		'500' : 'Erro'
	}
};

desenhador.metadata.factory()
	.set('resource', 'LoopBack1')
	.set('models', models)
	.set('actions', actions)
	.save();

desenhador.metadata.find({}, function (doc) {
	console.log(doc);
});



