inject.define("plugins.components.h2.h2", [function () {
    var self = {};
    self.name = 'h2';
	self.category = 'label';

	self.templ = '<h2>H2</h2>';

	self.property = {};

	self.property.label = {
		val : 'H2',
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