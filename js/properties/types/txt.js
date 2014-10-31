inject.define("properties.types.txt", [function () {
    var self = {}; 

	self.make = function (comp, field, property, td, $this) {			

		var name = 'property.'+field;
		
		var input = $('<input name="'+name+'" type="text" class="form-control input-sm" value="'+property.val+'"></input>');
		td.append(input);

		input.focusout(function () {
			if(comp.property[field])
				comp.property[field].val = input.val();

			if(property.update)
				property.update($this, input.val(), comp);
		});
	};	

	return self;
}]);