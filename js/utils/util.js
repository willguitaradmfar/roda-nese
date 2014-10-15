inject.define("utils.util", ["database.db", function (db) {
	var self = {};	

	self.clone = function (obj) {
		if(obj == null || typeof(obj) != 'object')
	        return obj;

	    var temp = obj.constructor(); // changed

	    for(var key in obj) {
	        if(obj.hasOwnProperty(key)) {
	            temp[key] = self.clone(obj[key]);
	        }
	    }
	    return temp;
	};	

	self.random = function (max) {
		max = max || 100
		var r = Math.round(Math.random()*max);
		return r;
	};

	self.stringify = function (comp) {
		var hand = function(key, value) {
 			if (typeof value === 'function') {
 				return value.toString();
 			} else {
 				return value;
 			}
		};
		return JSON.stringify(comp, hand);
	};	

	self.eval = function (script) {
		return eval('('+script+')');
	};
	
	return self;
}]);