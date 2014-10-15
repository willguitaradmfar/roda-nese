inject.define("palletas.components.h4", [function () {
    var self = {};
    self.name = 'h4';
	self.category = 'label';

	self.templ = '<h4>H4</h4>';

	self.property = {};
	self.property.label = 'H4';
	self.property.context = 'context';
	self.property.metafields_field = '';	

	self.update = function (target, comp) {
		$(target).text(comp.property.label);

		if(comp.property.metafields_field){
			var bind = comp.property.metafields_field.replace(':', comp.property.context+'.');
			$(target).attr('data-ng-bind', bind);
		}
		else{
			$(target).removeAttr('data-ng-bind');
		}
	};
    return self;
}]);