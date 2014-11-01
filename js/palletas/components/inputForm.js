inject.define("palletas.components.inputForm", [function () {
    var self = {};
    self.name = 'inputForm';
	self.category = 'input';

	self.templ = '<div class="col-lg-6 col-xs-12 col-sm-12 col-md-6 input-group">'
					+'<label>Input Text</label>'
					+'<input type="text" class="form-control" placeholder="Placeholder">'
				+'</div>';

	self.property = {};
	
	self.property.label = {
		val : 'Input Text',
		update : function (target, val, comp) {
			$(target).find('label').text(val);
		}
	};
	
	self.property.placeholder = {
		val : 'Placeholder',
		update : function (target, val, comp) {
			$(target).find('input').attr('placeholder', val);
		}
	};

	self.property.metafields_field = {
		config : {
			types : ['string', 'number', 'date']
		},
		update : function (target, val, comp) {			
			if(val.key){
				var bind = val.key;
				$(target).find('input').attr('data-ng-model', bind);
			}
		}
	};

	
    return self;
}]);