inject.define("palletas.components.h5", [function () {
    var self = {};
    self.name = 'h5';
	self.category = 'label';

	self.templ = '<h5>H5</h5>';

	self.property = {};
	self.property.label = 'H5';
	self.property.metacontext_context = 'context';
	self.property.metafields_field = '';	

	self.update = function (target, comp) {
		$(target).text(comp.property.label);

		if(comp.property.metafields_field){
			var bind = comp.property.metafields_field.replace(':', comp.property.metacontext_context+'.');
			$(target).attr('data-ng-bind', bind);
		}
		else{
			$(target).removeAttr('data-ng-bind');
		}
	};
    return self;
}]);