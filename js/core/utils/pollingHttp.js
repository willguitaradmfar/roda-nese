inject.define("core.utils.pollingHttp", [
		"core.utils.util",
	function (util) {
	    var self = {};

	    self.send = function (config) {
			var url = config.url || 'http://httpbin.org/post'
			var data = config.data || {};			
			var method = config.method || 'POST';
			var _headers = config.headers;
			var timeout = config.timeout || 1000 * 10;

			var _success = config.success || function (res) {
				console.warn('FUNCTION success NÃO IMPLEMENTADA res: ('+util.stringify(res)+')');
			};

			var _error = config.error || function (res) {
				console.warn('FUNCTION error NÃO IMPLEMENTADA res: ('+util.stringify(res)+')');
			};

			var _done = config.done || function (res) {
				console.warn('FUNCTION done NÃO IMPLEMENTADA res: ('+util.stringify(res)+')');
			};			

			$.ajax({
				url: url,							
				method : method,
				data: data,
				timeout: timeout,
				headers: _headers,
				success: function( res ) {
					console.debug('SUCESSO pollingHttp');
					_success(res);
				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.warn('ERRO pollingHttp');
					var e = {};
					e.jqXHR = jqXHR;
					e.textStatus = textStatus;
					e.errorThrown = errorThrown;
					_error(e);					
				}
			}).done(function ( res ) {
				console.debug('DONE pollingHttp');
				_done(res);
			});

		};
	    return self;
	}]);