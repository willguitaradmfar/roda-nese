inject.define("config.internationalization", [
		"config.internationalization.pt_br",
		"config.internationalization.en_us",
	function (pt_br, en_us) {	
		var self = {};

		var translate = {};
		translate.pt_br = pt_br;
		translate.en_us = en_us;

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