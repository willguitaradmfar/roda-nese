inject.define("properties.types.txt", [function () {
    var self = {}; 

	self.make = function (comp, field, property, td) {			

		var name = 'property.'+field;
		
		var input = $('<input name="'+name+'" type="text" class="form-control input-sm" value="'+property+'"></input>');
		td.append(input);
	};	

	return self;
}]);