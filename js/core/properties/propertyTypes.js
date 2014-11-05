inject.define("core.properties.propertyTypes", [ 
				"core.properties.types.combo",				
				"core.properties.types.metaactions",				
				"core.properties.types.metafields",
				"core.properties.types.metafieldsmulti",				
				"core.properties.types.multitxt",
				"core.properties.types.txt",				
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