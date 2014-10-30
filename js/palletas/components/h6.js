inject.define("palletas.components.h6", [function () {
    var self = {};
    self.name = 'h6';
	self.category = 'label';

	self.templ = '<h6>H6</h6>';

	self.property = {};

	self.property.label = {
		val : 'H6',
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