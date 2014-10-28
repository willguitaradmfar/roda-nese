inject.define("properties.types", [ 
				"properties.types.combo",				
				"properties.types.metaactions",				
				"properties.types.metafields",
				"properties.types.metafieldsmulti",				
				"properties.types.multitxt",
				"properties.types.txt",				
	function (combo, metaactions, metafields, metafieldsmulti, multitxt, txt) {
		var self = {};
		self.types = {};
		self.types['combo'] = combo;		
		self.types['metaactions'] = metaactions;		
		self.types['metafields'] = metafields;
		self.types['metafieldsmulti'] = metafieldsmulti;		
		self.types['multitxt'] = multitxt;
		self.types['txt'] = txt;		
		return self;
	}]);