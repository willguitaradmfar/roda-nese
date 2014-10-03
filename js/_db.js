(function(global, undefined) {
	var db = function () {
		var _db = [];
		var id = 0;
		
		var findOne = function (id) {
			var hand;
			if(typeof id == 'string'){
				hand = function (obj, otherObj) {
					return(obj.___id == otherObj);
				}
			}
			if(!hand) throw 'HAND É INDEFINIDO';			
			for(var i in _db){
				var o = _db[i];
				if(hand(o, id)){
					return o;
				}
			}			
		};

		var update = function (query, newObject) {
			var result = findOne(query);						
			for(var i in newObject){
				result[i] = newObject[i];
			}
		};

		var remove = function (id) {
			var index = -1;
			for(var i in _db){
				var obj = _db[i];
				if(id == obj.___id){
					index = i;
				}
			}

			_db.splice(index, 1);
			return 1;
		};

		var count = function (query) {
			return find(query).length;
		}
		
		var find = function (query) {

			var hand = function (obj, otherObj) {
				return (obj === otherObj);
			};

			if(typeof query == 'string'){
				hand = function (obj, otherObj) {
					return(obj.___id == otherObj);
				}
			}
			var result = [];
			for(var i in _db){
				var o = _db[i];
				if(hand(o, query)){
					result.push(o);
				}
			}
			return result;
		};

		var insert = function (doc) {
			id++;
			doc.___id = id;
			_db.push(doc);
			return doc;
		};		

		return {
			insert : insert,
			find : find,
			findOne : findOne,
			remove : remove,
			count : count,
			update : update
		};
	};

	global.desenhador = global.desenhador || {};
	global.desenhador.db = global.desenhador.db || {};

	var database = new db();
		
	var insert = function (doc) {
		 return database.insert(doc);
	};

	var find = function (query, hand) {
		hand = hand || function (d) {
			console.debug('ENCONTRADO : '+d.___id);
		};
		var t = database.find(query);
		for(var i in t){
			hand(t[i]);
		}
	};

	var findOne = function(query) {
		var t = database.findOne(query);
		return t;
	};

	var findOneById = function(id) {
		var t = database.findOne(id);
		return t;
	};

	var remove = function (id) {
		if(!id) throw 'id indefinido'			
		var r = database.remove(id);
		console.debug('DELETOU '+r+' REGISTRO(S)');
		return r;
	};

	var count = function (query) {
		return database.count(query);
	};

	var update = function (query, _update) {
		return database.update(query, _update);
	};	

	global.desenhador.db.insert = insert;
	global.desenhador.db.find = find;
	global.desenhador.db.count = count;
	global.desenhador.db.update = update;
	global.desenhador.db.remove = remove;
	global.desenhador.db.findOne = findOne;
	global.desenhador.db.findOneById = findOneById;
	
})(window);