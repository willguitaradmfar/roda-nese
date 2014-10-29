inject.define("palletas.components.selectForm", [function () {
    var self = {};
    self.name = 'selectForm';
	self.category = 'input';

	self.templ = '<div class="input-group">'
					+'<label>Select</label>'
					+'<select name="selectbasic" class="form-control">'
					     +'<option>Option 1</option>'
					     +'<option>Option 2</option>'
					     +'<option>Option 3</option>'
					   +'</select>'
					+'</div>';

	self.property = {};
	self.property.label = 'Select';
	self.property.multitxt_options = 'Option 1,Option 2,Option 3';
	self.property.metafields_field = {config : {types : ['string', 'number', 'date']}};
	self.property.metafields_select = {config : {types : ['object']}};
	self.property.metafields_list = {config : {types : ['array']}};
	self.property.metaactions_init = {config : {types : ['action']}};

	self.update = function (target, comp) {
		$(target).attr('class', 'input-group component');
		$(target).find('label').text(comp.property.label);
		$(target).find('select').html('');
		var options = comp.property.multitxt_options.split(',');
		for(var i in options){
			$(target).find('select').append('<option value="'+options[i]+'">'+options[i]+'</option>');
		}
			
		$(target).find('select').attr('data-ng-model', comp.property.metafields_select.key);
		
		if(comp.property.metafields_field){
			
			var path = comp.property.metafields_field.path;
			
			var array = comp.property.metafields_list.key;
			var options = 'item as item.'+path+' for item in '+array;

			$(target).find('select').attr('data-ng-options', options);

			$(target).removeAttr('data-ng-init');
			if(comp.property.metaactions_init){
				var action = comp.property.metaactions_init.key;
				$(target).attr('data-ng-init', action);
			}
		}
	};
    return self;
}]);