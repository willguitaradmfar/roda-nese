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

	self.property.label = {
		val : 'Select',
		update : function (target, val, comp) {
			$(target).find('label').text(val);
		}
	};

	self.property.multitxt_options = {
		val : 'Option 1,Option 2,Option 3',
		update : function (target, val, comp) {
			$(target).find('select').html('');
			var options = val.split(',');
			for(var i in options){
				$(target).find('select').append('<option value="'+options[i]+'">'+options[i]+'</option>');
			}			
		}
	};

	self.property.metafields_field = {
		config : {
			types : ['string', 'number', 'date']
		},
		update : function (target, val, comp) {
			if(val.path){
				
				var path = val.path;
				
				var array = comp.property.metafields_list.val.key;
				var options = 'item as item.'+path+' for item in '+array;

				$(target).find('select').attr('data-ng-options', options);

				$(target).removeAttr('data-ng-init');
				if(comp.property.metaactions_init.val){
					var action = comp.property.metaactions_init.val.key;
					$(target).attr('data-ng-init', action);
				}
			}
		}
	};

	self.property.metafields_select = {
		config : {
			types : ['object']
		},
		update : function (target, val, comp) {
			$(target).find('select').attr('data-ng-model', val.key);
		}
	};

	self.property.metafields_list = {
		config : {
			types : ['array']
		},
		update : function (target, val, comp) {
			if(comp.property.metafields_field){
				
				var path = comp.property.metafields_field.val.path;
				
				var array = val.key;
				var options = 'item as item.'+path+' for item in '+array;

				$(target).find('select').attr('data-ng-options', options);

				$(target).removeAttr('data-ng-init');
				if(comp.property.metaactions_init.val){
					var action = comp.property.metaactions_init.val.key;
					$(target).attr('data-ng-init', action);
				}
			}
		}
	};

	self.property.metaactions_init = {
		config : {
			types : ['action']
		},
		update : function (target, val, comp) {
			if(comp.property.metafields_field.val){
				
				var path = comp.property.metafields_field.val.path;
				
				var array = val.key;
				var options = 'item as item.'+path+' for item in '+array;

				$(target).find('select').attr('data-ng-options', options);

				$(target).removeAttr('data-ng-init');
				if(val){
					var action = val.key;
					$(target).attr('data-ng-init', action);
				}
			}
		}
	};

    return self;
}]);