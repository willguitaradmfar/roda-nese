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
	self.property.metacontext_context = 'context';
	self.property.metafields_field = 'field';
	self.property.metamodels_select = 'select';
	self.property.metaarrays_list = 'list';
	self.property.metaactions_init = '';

	self.update = function (target, comp) {
		$(target).attr('class', 'input-group component');
		$(target).find('label').text(comp.property.label);
		$(target).find('select').html('');
		var options = comp.property.multitxt_options.split(',');
		for(var i in options){
			$(target).find('select').append('<option value="'+options[i]+'">'+options[i]+'</option>');
		}

		var context = comp.property.metacontext_context+'.';		
		$(target).find('select').attr('data-ng-model', comp.property.metamodels_select.replace(/:/, context));
		
		if(comp.property.metafields_field){
			
			var path = comp.property.metafields_field.path;
			
			var array = comp.property.metaarrays_list.replace(':', context);
			var options = 'item as item.'+path+' for item in '+array;

			$(target).find('select').attr('data-ng-options', options);

			$(target).removeAttr('data-ng-init');
			if(comp.property.metaactions_init){
				var action = comp.property.metaactions_init;
				$(target).attr('data-ng-init', action);
			}
		}
	};
    return self;
}]);