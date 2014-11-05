inject.define("plugins.components.h5.h5", [function () {
    var self = {};
    self.name = 'h5';
	self.category = 'label';

	self.templ = '<h5>H5</h5>';

	self.property = {};

	self.property.label = {
		val : 'H5',
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