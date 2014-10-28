inject.define("palletas.components.label", [function () {
    var self = {};
    self.name = 'label';
	self.category = 'label';

	self.templ = '<label class="label label-default">Label</label>';

	self.property = {};
	self.property.label = 'Label';
	self.property.combo_tipo = {val : 'default', options : ['default', 'info', 'danger', 'success', 'warning']};	
	self.property.metafields_field = {config : {types : ['string', 'number', 'date']}};

	self.update = function (target, comp) {
		$(target).attr('class', 'component label label-'+comp.property.combo_tipo.val);
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