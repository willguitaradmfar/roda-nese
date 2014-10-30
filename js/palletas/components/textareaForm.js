inject.define("palletas.components.textareaForm", [function () {
    var self = {};
    self.name = 'textareaForm';
	self.category = 'input';

	self.templ = '<div class="input-group">'
					+'<label>Text Area</label>'
					+'<textarea class="form-control" rows="5", cols="5" placeholder="Placeholder"></textarea>'
				+'</div>';

	self.property = {};

	self.property.rows = {
		val : '5',
		update : function (target, val, comp) {
			$(target).find('textarea').attr('rows', val);
		}
	};

	self.property.cols = {
		val : '5',
		update : function (target, val, comp) {			
			$(target).find('textarea').attr('cols', val);
		}
	};

	self.property.label = {
		val : 'Text Area',
		update : function (target, val, comp) {
			$(target).find('label').text(val);
		}
	};
	
	self.property.placeholder = {
		val : 'Placeholder',
		update : function (target, val, comp) {
			$(target).find('textarea').attr('placeholder', val);
		}
	};

	self.property.metafields_field = {
		config : {
			types : ['string', 'number', 'date']
		},
		update : function (target, val, comp) {			
			if(val.key){
				var bind = val.key;
				$(target).find('textarea').attr('data-ng-model', bind);
			}
		}
	};
	
    return self;
}]);