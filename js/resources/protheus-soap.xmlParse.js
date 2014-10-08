(function(global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.resources = global.desenhador.resources || {};
	global.desenhador.resources.protheusSoap = global.desenhador.resources.protheusSoap || {};
	global.desenhador.resources.protheusSoap.xmlParse = global.desenhador.resources.protheusSoap.xmlParse || {};

	var self = global.desenhador.resources.protheusSoap.xmlParse;	

	self.parse = function (xml) {
		return desenhador.util.xmlToJSON(xml);
	};	
})(window);