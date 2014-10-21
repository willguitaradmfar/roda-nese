inject.define("palletas.components.inputDateForm", [
		"palletas.components.directives.inputDateForm",
	function (directive) {
	    var self = {};
	    self.name = 'inputDateForm';
		self.category = 'input';

		self.templ = '<div class="input-group">'
						+'<label>Input Date</label>'
						+'<input type="date" class="form-control" placeholder="Placeholder">'
					+'</div>';

		self.directive = directive;

		self.property = {};
		self.property.label = 'Input Date';
		self.property.placeholder = 'Placeholder';
		self.property.context = 'context';	
		self.property.metafields_field = 'model';

		self.update = function (target, comp) {
			$(target).attr('class', 'input-group component ');
			$(target).find('input').attr('placeholder', comp.property.placeholder);
			$(target).find('label').text(comp.property.label);
			var bind = comp.property.metafields_field.replace(':', comp.property.context+'.');
			$(target).find('input').attr('data-ng-model', bind);
		};
	    return self;
	}]);