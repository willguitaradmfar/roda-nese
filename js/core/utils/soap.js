inject.define("core.utils.soap", [function () {
    var self = {};
    	self.sendSoap = function (url, method, _parameters, tagResult, _cb_resp, _cb_respError) {

		var parameters = new SOAPClientParameters();
		for(var i in _parameters){
			var param  = _parameters[i];
			parameters.add(i, param);
		}		
		SOAPClient.invoke(url, method, parameters, false, function (o, doc) {
			if(!tagResult) throw '[tagResult] nao foi informado';

			var query = tagResult;
			var result = doc.querySelector(query).innerHTML;

			if(_cb_resp)
				_cb_resp(result);
			else
				console.debug(result);

		}, function (e) {

			if(_cb_respError)
				_cb_respError(e);
			else
				console.error(_cb_respError);
			
		});
	};
    return self;
}]);