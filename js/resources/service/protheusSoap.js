(function(global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.resources = global.desenhador.resources || {};
	global.desenhador.resources.protheusSoap = global.desenhador.resources.protheusSoap || {};	
	global.desenhador.resources.protheusSoap.service = global.desenhador.resources.protheusSoap.service || {};	

	var self = global.desenhador.resources.protheusSoap.service;
	
	self.scope = {};	

	self.scope.soap = function () {

		var list = function (_parameters, _cb_resp) {
			var parameters = new SOAPClientParameters();

			for(var i in _parameters){
				var param  = _parameters[i];
				parameters.add(i, param);
			}

			SOAPClient.invoke(
				"http://192.168.122.94/GETDATABASE.apw"
				, "GETDATATABLE"
				, parameters
				, false
				, function (o, doc) {							
					var result = doc.querySelector("GETDATATABLERESULT").innerHTML;							
					_cb_resp(result);							
				});
	};

		return {
			list : list
		}
	};

})(window);