inject.define("database.db", [function () {
    var self = {};
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

		var bkp = function () {
			return _db;
		}

		var restoreBkp = function (__db) {
			_db = __db;
		}

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
			update : update,
			bkp : bkp,
			restoreBkp : restoreBkp
		};
	};	

	var database = new db();
		
	self.insert = function (doc) {
		 return database.insert(doc);
	};

	self.bkp = function () {
		return database.bkp();
	};

	self.restoreBkp = function (__db) {		
		database.restoreBkp(__db);
	}

	self.find = function (query, hand) {
		hand = hand || function (d) {
			console.debug('ENCONTRADO : '+d.___id);
		};
		var t = database.find(query);
		for(var i in t){
			hand(t[i]);
		}
	};

	self.findOne = function(query) {
		var t = database.findOne(query);
		return t;
	};

	self.findOneById = function(id) {
		var t = database.findOne(id);
		return t;
	};

	self.remove = function (id) {
		if(!id) throw 'id indefinido'			
		var r = database.remove(id);
		console.debug('DELETOU '+r+' REGISTRO(S)');
		return r;
	};

	self.count = function (query) {
		return database.count(query);
	};

	self.update = function (query, _update) {
		return database.update(query, _update);
	};

    return self;
}]);