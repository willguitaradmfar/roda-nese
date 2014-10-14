inject.define("config.internationalization", ["config.internationalization.translate", function (translate) {
	
	var self = {};

	self.setLanguage = function (language) {
		self.language = language;
	};

	self.translate = function (moduleName, key) {

		if(!translate[self.language]){
			console.warn('LANGUAGEM NAO INCLUIDA');
			return key;
		}
		if(!translate[self.language][moduleName]){
			console.warn('MODULO '+moduleName+' NAO TEM TRADUCAO');
			return key;
		}
		if(!translate[self.language][moduleName][key]){
			console.warn('CHAVE '+key+' DO MODULO '+moduleName+' NAO TEM TRADUCAO');
			return key;
		}

		var transated = translate[self.language][moduleName][key];
		return (transated ? transated : key);
	};

	return self;

}]);