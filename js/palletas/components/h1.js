inject.define("palletas.components.h1", [function () {
    var self = {};
    self.name = 'h1';
	self.category = 'label';

	self.templ = '<h1>H1</h1>';

	self.property = {};
	self.property.label = 'H1';
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