inject.define("palletas.resources.protheusRest.service", [function () {
    var self = {};
    self.scope = {};

	self.scope.rest = function ($http) {
		var data = function (config) {
			var url = config.url || 'http://172.16.84.84:9090'; // maquina do (CARLOS TESTA)
			var table = config.table || 'SA1';
			var limit = config.limit || 20;
			var OPC = config.OPC || 'DATA';

			$http.get(url+'/?OPC='+OPC+'&OPC1='+table+'&LIMIT='+limit).
				success(function(data, status, headers, conf) {
					if(config.success)config.success(data, status, headers, conf);
				}).
				error(function(data, status, headers, conf) {
					if(config.error)config.error(data, status, headers, conf);
				});
		};

		var post = function (config, data) {
			var url = config.url || 'http://172.16.84.84:9090'; // maquina do (CARLOS TESTA)
			var table = config.table || 'SA1';			
			var OPC = config.OPC || 'SAVE';

			$http.post(url+'/?OPC='+OPC+'&OPC1='+table+'&LIMIT='+limit, data).
				success(function(data, status, headers, conf) {
					if(config.success)config.success(data, status, headers, conf);
				}).
				error(function(data, status, headers, conf) {
					if(config.error)config.error(data, status, headers, conf);
				});
		};
		
		return {
			data : data
		}
	};

	self.scope.base64 = function () {
		var _self =  {
				_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
				
				encode : function (input) {
				    var output = "";
				    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
				    var i = 0;

				    input = _self._utf8_encode(input);

				    while (i < input.length) {

				        chr1 = input.charCodeAt(i++);
				        chr2 = input.charCodeAt(i++);
				        chr3 = input.charCodeAt(i++);

				        enc1 = chr1 >> 2;
				        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				        enc4 = chr3 & 63;

				        if (isNaN(chr2)) {
				            enc3 = enc4 = 64;
				        } else if (isNaN(chr3)) {
				            enc4 = 64;
				        }

				        output = output +
				        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
				        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

				    }

				    return output;
				},		
				decode : function (input) {
				    var output = "";
				    var chr1, chr2, chr3;
				    var enc1, enc2, enc3, enc4;
				    var i = 0;

				    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

				    while (i < input.length) {

				        enc1 = this._keyStr.indexOf(input.charAt(i++));
				        enc2 = this._keyStr.indexOf(input.charAt(i++));
				        enc3 = this._keyStr.indexOf(input.charAt(i++));
				        enc4 = this._keyStr.indexOf(input.charAt(i++));

				        chr1 = (enc1 << 2) | (enc2 >> 4);
				        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				        chr3 = ((enc3 & 3) << 6) | enc4;

				        output = output + String.fromCharCode(chr1);

				        if (enc3 != 64) {
				            output = output + String.fromCharCode(chr2);
				        }
				        if (enc4 != 64) {
				            output = output + String.fromCharCode(chr3);
				        }

				    }

				    output = _self._utf8_decode(output);

				    return output;

				},		
				_utf8_encode : function (string) {
				    string = string.replace(/\r\n/g,"\n");
				    var utftext = "";

				    for (var n = 0; n < string.length; n++) {

				        var c = string.charCodeAt(n);

				        if (c < 128) {
				            utftext += String.fromCharCode(c);
				        }
				        else if((c > 127) && (c < 2048)) {
				            utftext += String.fromCharCode((c >> 6) | 192);
				            utftext += String.fromCharCode((c & 63) | 128);
				        }
				        else {
				            utftext += String.fromCharCode((c >> 12) | 224);
				            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				            utftext += String.fromCharCode((c & 63) | 128);
				        }

				    }

				    return utftext;
				},		
				_utf8_decode : function (utftext) {
				    var string = "";
				    var i = 0;
				    var c = c1 = c2 = 0;

				    while ( i < utftext.length ) {

				        c = utftext.charCodeAt(i);

				        if (c < 128) {
				            string += String.fromCharCode(c);
				            i++;
				        }
				        else if((c > 191) && (c < 224)) {
				            c2 = utftext.charCodeAt(i+1);
				            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				            i += 2;
				        }
				        else {
				            c2 = utftext.charCodeAt(i+1);
				            c3 = utftext.charCodeAt(i+2);
				            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				            i += 3;
				        }

				    }

				    return string;
				}
			};
		
		return _self;
	};

    return self;
}]);