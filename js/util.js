var desenhador = desenhador || {};

(function(desenhador) {
	desenhador.util = desenhador.util || {};

	desenhador.util.updateCompSerializable = function ($this, comp) {		

		var hand = function(key, value) {
			if (typeof value === 'function') {
				return value.toString();
			} else {
				return value;
			}
		};

		var stringify = JSON.stringify(comp, hand);

		$this.attr('comp', stringify);		
	};

	desenhador.util.eval = function (script) {
		return eval('('+script+')');
	};

	desenhador.util.processTemplate = function (keys, values, template) {
		var result = template;
		for(var i in keys){
			var key = keys[i];
			var regex = new RegExp('\\$'+key+'\\$', "ig");
			result = result.replace(regex, values[i]);
		}
		return result;
	};

	desenhador.util.rest = function (config) {

		var url = config.url || 'http://httpbin.org/get'
		var data = config.data || {};
		var dataType = config.dataType;

		var method = config.method;

		var _success = config.success || function (res) {
			console.warn('FUNCTION success NÃO IMPLEMENTADA res: ('+JSON.stringify(res)+')');
		};

		var _error = config.error || function (res) {
			console.warn('FUNCTION error NÃO IMPLEMENTADA res: ('+JSON.stringify(res)+')');
		};

		$.ajax({
	        url: url,
	        jsonp: "callback",
	        dataType: dataType,
	        method : method,
	        data: data,
	        success: function( res ) {
	            _success(res);
	        },
	        error : function(jqXHR, textStatus, errorThrown) {
	        	var e = {};
	        	e.jqXHR = jqXHR;
	        	e.textStatus = textStatus;
	        	e.errorThrown = errorThrown;
	        	_error(e);
	        }
	    });

	};

})(desenhador);