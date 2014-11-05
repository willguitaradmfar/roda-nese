inject.define("plugins.components.label.label", [function () {
    var self = {};
    self.name = 'label';
	self.category = 'label';

	self.templ = '<label class="label label-default">Label</label>';

	self.property = {};

	self.property.label = {
		val : 'Label',
		update : function (target, val, comp) {
			$(target).text(val);
		}
	};

	self.property.combo_tipo = {
		config : {
			options : ['default', 'info', 'danger', 'success', 'warning']
		},
		val : 'default',
		update : function (target, val, comp) {
			$(target).attr('class', 'component label label-'+val);
		}
	};

	self.property.metafields_field = {
		config : {
			types : ['string', 'number', 'date']
		},
		update : function (target, val, comp) {
			if(val.key){
				var bind = val.key;
				$(target).attr('data-ng-bind', bind);
			}
			else{
				$(target).removeAttr('data-ng-bind');
			}
		}
	};
	
    return self;
}]);