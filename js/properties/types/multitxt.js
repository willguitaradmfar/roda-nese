inject.define("properties.types.multitxt", [function () {
    var self = {}; 

	self.make = function (comp, field, property, td, $this) {
		var name = 'property.'+field;
		
		var input = $('<input name="'+name+'" type="text" class="form-control input-sm" value="'+property.val+'"></input>');
		td.append(input);			
		input.tagsinput();
		$(input).on('itemAdded', function(event) {
		  	var val = $(event.target).val();
		  	comp.property[field].val = val;
			property.update($this, val, comp);
		});

		$(input).on('itemAdded', function(event) {
		  	var val = $(event.target).val();
		  	comp.property[field].val = val;

		  	if(property.update)
				property.update($this, val, comp);
		});

		$(input).on('itemRemoved', function(event) {
		  	var val = $(event.target).val();
		  	comp.property[field].val = val;

		  	if(property.update)
				property.update($this, val, comp);
		});
		
	};	

	return self;
}]);