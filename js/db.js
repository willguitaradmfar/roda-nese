(function(global, undefined) {
	var db = TAFFY();	
	global.desenhador = global.desenhador || {};
	global.desenhador.db = global.desenhador.db || {};
		
	var insert = function (doc) {
		 return db.insert(doc).last();
	};

	var find = function (query, hand) {
		var t = db(query);
		if(hand)
			t.each(hand);
		return t.first();
	};

	var remove = function (id) {
		if(!id) throw 'id indefinido'

		var r = db(id).remove();
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
	
})(window);