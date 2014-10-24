inject.define("palletas.components.h3", [function () {
    var self = {};
    self.name = 'h3';
	self.category = 'label';

	self.templ = '<h3>H3</h3>';

	self.property = {};
	self.property.label = 'H3';	
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