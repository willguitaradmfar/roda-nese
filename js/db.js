(function(global, undefined) {
	var db = TAFFY();	
	global.desenhador = global.desenhador || {};
	global.desenhador.db = global.desenhador.db || {};
		
		
	var insert = function (doc) {
		 return db.insert(doc).last();
	};

	var find = function (query, hand) {
		hand = hand || function (d) {
			console.debug('ENCONTRADO : '+d.___id);
		};
		var t = db(query);		
		t.each(hand);		
	};

	var findOne = function(query) {
		var t = db(query);		
		return t.first();
	};

	var findOneById = function(id) {
		if(!id) throw 'ID INDEFINIDO';

		var t = db({___id : id});
		return t.first();
	};

	var remove = function (id) {
		if(!id) throw 'id indefinido'			
		var r = db(id).remove();
		console.debug('DELETOU '+r+' REGISTRO(S)');
		return r;
	};

	var count = function (query) {
		return db(query).count();
	};

	var update = function (query, _update) {
		return db(query).update(_update);
	};	

	global.desenhador.db.insert = insert;
	global.desenhador.db.find = find;
	global.desenhador.db.count = count;
	global.desenhador.db.update = update;
	global.desenhador.db.remove = remove;
	global.desenhador.db.findOne = findOne;
	global.desenhador.db.findOneById = findOneById;
	
})(window);