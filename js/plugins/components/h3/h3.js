inject.define("plugins.components.h3.h3", [function () {
    var self = {};
    self.name = 'h3';
	self.category = 'label';

	self.templ = '<h3>H3</h3>';

	self.property = {};

	self.property.label = {
		val : 'H3',
		update : function (target, val, comp) {
			$(target).text(val);
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
			}else{
				$(target).removeAttr('data-ng-bind');
			}
		}
	};
    return self;
}]);