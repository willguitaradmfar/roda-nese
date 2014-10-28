inject.define("palletas.components.textareaForm", [function () {
    var self = {};
    self.name = 'textareaForm';
	self.category = 'input';

	self.templ = '<div class="input-group">'
					+'<label>Text Area</label>'
					+'<textarea class="form-control" rows="5", cols="5" placeholder="Placeholder"></textarea>'
				+'</div>';

	self.property = {};
	self.property.label = 'Text Area';
	self.property.placeholder = 'Placeholder';
	self.property.rows = '5';
	self.property.cols = '5';	
	self.property.metafields_field = {config : {types : ['string', 'number', 'date']}};

	self.update = function (target, comp) {
		$(target).attr('class', 'input-group component ');
		$(target).find('textarea').attr('rows', comp.property.rows);
		$(target).find('textarea').attr('cols', comp.property.cols);
		$(target).find('textarea').attr('placeholder', comp.property.placeholder);
		$(target).find('label').text(comp.property.label);
		var bind = comp.property.metafields_field.key;
		$(target).find('textarea').attr('data-ng-model', bind);
	};
    return self;
}]);