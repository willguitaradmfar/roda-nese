inject.define("core.utils.rest", [
		"core.utils.util",
	function (util) {
	    var self = {};
	    self.rest = function (config) {

			var url = config.url || 'http://httpbin.org/get'
			var data = config.data || {};
			var dataType = config.dataType;
			var method = config.method;

			var _success = config.success || function (res) {
				console.warn('FUNCTION success NÃO IMPLEMENTADA res: ('+util.stringify(res)+')');
			};

			var _error = config.error || function (res) {
				console.warn('FUNCTION error NÃO IMPLEMENTADA res: ('+util.stringify(res)+')');
			};

			$.ajax({
				url: url,
				jsonp: "callback",
				dataType: dataType,
				method : method,
				data: data,
				success: function( res ) {
					console.debug('SUCESSO NA CONSULTA PARA CRIAR METADATA');				
					_success(res);
				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.error('ERRO NA CONSULTA PARA CRIAR METADATA');
					var e = {};
					e.jqXHR = jqXHR;
					e.textStatus = textStatus;
					e.errorThrown = errorThrown;
					_error(e);
				}
			});
		};
	    return self;
	}]);