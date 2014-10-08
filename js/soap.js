(function(global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.soap = global.desenhador.soap || {};

	var self = global.desenhador.soap;	

	self.sendSoap = function (url, method, _parameters, _cb_resp) {
		self.url = url;
		self.method = method;
		self._parameters = _parameters;

		var parameters = new SOAPClientParameters();
		for(var i in _parameters){
			var param  = _parameters[i];
			parameters.add(i, param);
		}		
		SOAPClient.invoke(url, method, parameters, false, function (o, doc) {
			if(!self.tagResult) throw '[tagResult] nao foi informado';

			var query = self.tagResult;
			var result = doc.querySelector(query).innerHTML;

			if(_cb_resp)
				_cb_resp(result);
			else
				console.debug(result);

		});
	};	
})(window);