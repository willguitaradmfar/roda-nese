(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.config = global.desenhador.config || {};
	global.desenhador.config.internationalization = global.desenhador.config.internationalization || {};
	var self = global.desenhador.config.internationalization;

	self.translate = function (moduleName, key) {
		if(!desenhador.config.internationalization[self.language]){
			console.warn('LANGUAGEM NAO INCLUIDA');
			return key;
		}
		if(!desenhador.config.internationalization[self.language][moduleName]){
			console.warn('MODULO '+moduleName+' NAO TEM TRADUCAO');
			return key;
		}
		if(!desenhador.config.internationalization[self.language][moduleName][key]){
			console.warn('CHAVE '+key+' DO MODULO '+moduleName+' NAO TEM TRADUCAO');
			return key;
		}

		var transated = desenhador.config.internationalization[self.language][moduleName][key];
		return (transated ? transated : key);
	};

})(window)