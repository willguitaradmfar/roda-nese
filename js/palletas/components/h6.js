inject.define("palletas.components.h6", [function () {
    var self = {};
    self.name = 'h6';
	self.category = 'label';

	self.templ = '<h6>H6</h6>';

	self.property = {};
	self.property.label = 'H6';	
	self.property.metafields_field = '';

	self.update = function (target, comp) {
		$(target).text(comp.property.label);

		
		if(comp.property.metafields_field){
			var bind = comp.property.metafields_field.key;
			$(target).attr('data-ng-bind', bind);
		}
		else{
			$(target).removeAttr('data-ng-bind');
		}
	};
    return self;
}]);