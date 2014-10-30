inject.define("palletas.components.h4", [function () {
    var self = {};
    self.name = 'h4';
	self.category = 'label';

	self.templ = '<h4>H4</h4>';

	self.property = {};

	self.property.label = {
		val : 'H4',
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