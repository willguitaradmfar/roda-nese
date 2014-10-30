inject.define("palletas.components.progress", [function () {
    var self = {};
    self.name = 'progress';
	self.category = 'label';

	self.templ = '<div class="progress">'
					+'<div style="width: 60%;" role="progressbar" class="progress-bar progress-bar-success progress-bar-striped" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20">'
					+'</div>'
				+'</div>';

	self.property = {};

	self.property.maxValue = {
		val : '100',
		update : function (target, val, comp) {
			if(val){
				$(target).find('.progress-bar').attr('aria-valuemax', val);
			}
		}
	};

	self.property.minValue = {
		val : '0',
		update : function (target, val, comp) {
			if(val){
				$(target).find('.progress-bar').attr('aria-valuemin', val);
			}
		}
	};

	self.property.combo_tipo = {
		config : {
			options : ['default', 'info', 'danger', 'success', 'warning']
		},
		val : 'success',
		update : function (target, val, comp) {
			var _class = [];
			_class.push('progress-bar');

			if(val){
				_class.push('progress-bar-'+val);
			}

			if(comp.property.combo_striped.val && comp.property.combo_striped.val != 'none'){
				_class.push('progress-bar-'+comp.property.combo_striped.val);
			}

			$(target).find('.progress-bar').attr('class', _class.join(' '));
		}
	};

	self.property.combo_striped = {
		config : {
			options : ['striped', 'none']
		},
		val : 'striped',
		update : function (target, val, comp) {
			var _class = [];
			_class.push('progress-bar');

			if(comp.property.combo_tipo.val){
				_class.push('progress-bar-'+comp.property.combo_tipo.val);
			}

			if(val && val != 'none'){
				_class.push('progress-bar-'+val);
			}

			$(target).find('.progress-bar').attr('class', _class.join(' '));
		}
	};

	self.property.metafields_value = {
		config : {
			types : ['number']
		},
		update : function (target, val, comp) {
			var field = 50;
			if(val.key){
				field = '{{'+val.key+'}}';
			}

			$(target).find('.progress-bar').attr('aria-valuenow', field);
			$(target).find('.progress-bar').attr('style', 'width: '+field+'%;');
		}
	};

	self.update = function (target, comp) {

		
	};
    return self;
}]);