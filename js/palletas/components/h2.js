inject.define("palletas.components.h2", [function () {
    var self = {};
    self.name = 'h2';
	self.category = 'label';

	self.templ = '<h2>H2</h2>';

	self.property = {};
	self.property.label = 'H2';	
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