inject.define("properties.types.enumTypes", [function () {
    var self = {}; 

	self.templetes = {};
	self.templetes['txt'] = 'txt';
	self.templetes['combo'] = 'combo';
	self.templetes['multitxt'] = 'multitxt';
	self.templetes['metafields'] = 'metafields';
	self.templetes['metamodels'] = 'metamodels';
	self.templetes['metaactions'] = 'metaactions';
	self.templetes['metafieldsmulti'] = 'metafieldsmulti';
	self.templetes['metaarrays'] = 'metaarrays';	

	self.make = function (type) {
		var value = self.templetes[type];
		if(!value)
			console.warn('Tipo nao encontrado');			
		return value;
	};		

	return self;
}]);