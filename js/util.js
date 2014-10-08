(function(global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.util = global.desenhador.util || {};

	var self = global.desenhador.util;

	self.xmlToJSON = function (xml) {
		var x2js = new X2JS();
		if(!xml) throw 'NÃO FOI PASSADO O XML';
		var obj = x2js.xml_str2json(xml);
		return obj;
	};

	self.JSONToXml = function (json) {
		var x2js = new X2JS();
		if(!json) throw 'NÃO FOI PASSADO O XML';
		var xml = x2js.json2xml_str(json);
		return xml;
	};

	self.clone = function (obj) {
		if(obj == null || typeof(obj) != 'object')
	        return obj;

	    var temp = obj.constructor(); // changed

	    for(var key in obj) {
	        if(obj.hasOwnProperty(key)) {
	            temp[key] = desenhador.util.clone(obj[key]);
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

	self.bkpDB = function () {
		return desenhador.db.bkp();
	};

	self.restoreBkpDB = function (__db) {
		return desenhador.db.restoreBkp(__db);
	};


	self.updateCompDB = function ($this, comp, field) {
		var _field = field || 'data-comp-id';
		
		var id = $($this).attr(_field);		
		
		if(id) {
			console.debug('ATUALIZANDO COMPONENTE ('+id+') attr('+_field+')');
			desenhador.db.update(id, comp);
			return id;
		}else{			
			id = desenhador.db.insert(desenhador.util.clone(comp)).___id;
			console.debug('CRIANDO COMPONENTE ('+comp.name+') ('+id+') attr('+_field+')');
			$($this).attr(_field, id);
			return id;
		}		
	};

	self.removeCompDB = function ($this, field) {
		var _field = field || 'data-comp-id';

		var id = $($this).attr(_field);		
		var r = desenhador.db.remove(id);
		if(r == 1){
			console.debug('COMPONENTE ('+id+') REMOVIDO DA BASE DE DADOS attr('+_field+')');
		}else{
			console.error('O COMPONENTE '+id+' NÃO PODE SER REMOVIDO OU NÃO FOI ENCONTRADO attr('+_field+')');
		}
	};

	self.getCompDBById = function ($this, field) {
		var _field = field || 'data-comp-id';

		var id = $($this).attr(_field);
		if(id) {
			var result = desenhador.db.findOneById(id);
			if(!result){
				throw 'COMPONENTE ('+id+') NÃO ENCONTRADO NA MASE DE DADOS attr('+_field+')';
			}
			console.debug('COMPONENTE ('+result.___id+') ENCONTRADO COM ARGUMENTO ID '+id+' attr('+_field+')');
			return result;
		}	
	};

	self.eval = function (script) {
		return eval('('+script+')');
	};	

	self.dynamicMetadata = function (_obj) {
		this.metadata = {};
		this.models = {};
		this.arrays = {};

		this.nav = function (obj, parent) {
			for(var i in obj){
				var o = obj[i];
				var otype = (typeof o);

				if(!o)return;

				if(otype === 'object'){
					this.nav(o, parent+'.'+i);
					otype = (o.length ? 'array' : otype);
				}

				var path = (parent+'.'+i);
				path = path.replace(/\.\d+/g, '');
				this.metadata[path] = otype;
			}
		};

		this.nav(_obj, 'root');

		for(var i in this.metadata){
			var otype = this.metadata[i];
			var path = i;
			if(otype == 'object'){
				var _parts = path.split('.');
				this.models[_parts[_parts.length-1]] = '';
			}
			if(otype == 'array'){
				var _parts = path.split('.');
				this.arrays[_parts[_parts.length-1]] = '';
			}
		}

		for(var y in this.models){
			var model = this.models[y];
			this.models[y] = {};
			this.models[y].before = {};
			this.models[y].after = {};
			for(var i in this.metadata){
				var otype = this.metadata[i];
				var path = i;
				if(otype != 'object' && otype != 'array'){
					if(path.indexOf(y+'.') > 0){
						var _parts = path.split(y+'.');
						var before = _parts[0].replace('root\.', '');						
						this.models[y].before[before] = '';
						this.models[y].after[_parts[1]] = otype;
					}
				}
			}
		}

		for(var y in this.arrays){
			var array = this.arrays[y];
			this.arrays[y] = {};
			this.arrays[y].before = {};
			this.arrays[y].after = {};
			for(var i in this.metadata){
				var otype = this.metadata[i];
				var path = i;
				if(otype != 'object' && otype != 'array'){
					if(path.indexOf(y+'.') > 0){
						var _parts = path.split(y+'.');
						var before = _parts[0].replace('root\.', '');						
						this.arrays[y].before[before] = '';
						this.arrays[y].after[_parts[1]] = otype;
					}
				}
			}
		}

	};

	self.processTemplate = function (keys, values, template) {
		if(!template) throw 'Template indefinido';		
		var result = template.toString();
		for(var i in keys){
			var key = keys[i];
			var regex = new RegExp('\\$'+key+'\\$', "ig");
			result = result.replace(regex, values[i]);
		}
		return result;
	};

	self.rest = function (config) {

		var url = config.url || 'http://httpbin.org/get'
		var data = config.data || {};
		var dataType = config.dataType;
		var method = config.method;

		var _success = config.success || function (res) {
			console.warn('FUNCTION success NÃO IMPLEMENTADA res: ('+desenhador.util.stringify(res)+')');
		};

		var _error = config.error || function (res) {
			console.warn('FUNCTION error NÃO IMPLEMENTADA res: ('+Jdesenhador.util.stringify(res)+')');
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

	self.Base64 = {
		_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		
		encode : function (input) {
		    var output = "";
		    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		    var i = 0;

		    input = self.Base64._utf8_encode(input);

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

		    output = self.Base64._utf8_decode(output);

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

})(window);