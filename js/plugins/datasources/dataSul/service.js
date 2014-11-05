inject.define("plugins.datasources.protheusSoap.service", [function () {
    var self = {};
    self.scope = {};

	self.scope.soap = function () {
		var list = function (_parameters, _cb_resp) {
			var parameters = new SOAPClientParameters();

			for(var i in _parameters){
				var param  = _parameters[i];
				parameters.add(i, param);
			}

			SOAPClient.invoke(
				"http://172.16.84.95/GETDATABASE.apw"
				, "GETDATATABLE"
				, parameters
				, false
				, function (o, doc) {							
					var result = doc.querySelector("GETDATATABLERESULT").innerHTML;	
					var faultString = doc.querySelector("faultstring");
					if(faultString){
						faultString = faultString.innerHTML;
					}					
					_cb_resp(faultString, result);
				});
		};

		var save = function (_parameters, _cb_resp) {
			var parameters = new SOAPClientParameters();

			for(var i in _parameters){
				var param  = _parameters[i];
				parameters.add(i, param);
			}			

			SOAPClient.invoke(
				"http://172.16.84.95/GETDATABASE.apw"
				, "SAVEDATA"
				, parameters
				, false
				, function (o, doc) {							
					var result = doc.querySelector("GETDATATABLERESULT").innerHTML;	
					var faultString = doc.querySelector("faultstring");
					if(faultString){
						faultString = faultString.innerHTML;
					}					
					_cb_resp(faultString, result);
				});
		};
		
		return {
			list : list,
			save : save
		}
	};

    return self;
}]);