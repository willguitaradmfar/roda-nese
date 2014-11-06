inject.define("core.utils.util", [function () {
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
		var response;
		try{
			response = eval('('+script+')');
		}catch(e){
			try{
				response = eval(script);
			}catch(e){
				throw e;
			}
		}
		return response;
	};

	self.normalizeVariable = function (str) {
		return str.replace(/-/g, '_');
	};
	
	self.decodeUTF = function (str) {

		
	};

	

	return self;
}]);