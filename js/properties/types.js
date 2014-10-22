inject.define("properties.types", [ 
				"properties.types.combo",				
				"properties.types.metaactions",
				"properties.types.metaarrays",
				"properties.types.metafields",
				"properties.types.metafieldsmulti",
				"properties.types.metamodels",
				"properties.types.multitxt",
				"properties.types.txt",
				"properties.types.metacontext",
	function (combo, metaactions, metaarrays, metafields, metafieldsmulti, metamodels, multitxt, txt, metacontext) {
		var self = {};
		self.types = {};
		self.types['combo'] = combo;		
		self.types['metaactions'] = metaactions;
		self.types['metaarrays'] = metaarrays;
		self.types['metafields'] = metafields;
		self.types['metafieldsmulti'] = metafieldsmulti;
		self.types['metamodels'] = metamodels;
		self.types['multitxt'] = multitxt;
		self.types['txt'] = txt;
		self.types['metacontext'] = metacontext;
		return self;
	}]);