inject.define("palletas.components.chartPolarArea", [
		"palletas.components.directives.chartPolarArea",
	function (directive) {
	    var self = {};
	    self.name = 'chartPolarArea';
		self.category = 'chart';

		self.directive = directive;

		self.templ = '<img width="50" height="50" src="image/components/chartPolarArea.png" data-polar-area-chart>';

		self.property = {};
		self.property.width = '200';
		self.property.height = '200';		

		self.property.metafields_labelField  = {config : {types : ['string']}};
		self.property.metafields_valueField = {config : {types : ['number']}};		
		self.property.metafields_colorField = {config : {types : ['string']}};
		self.property.metafields_list = {config : {types : ['array']}};

		self.property.metaactions_init = {config : {types : ['action']}};

		self.update = function (target, comp) {			

			$(target).attr('width', comp.property.width);
			$(target).attr('height', comp.property.height);

			$(target).removeAttr('data-chart-data');
			if(comp.property.metafields_list){
				var data = comp.property.metafields_list.key;
				$(target).attr('data-chart-data', data);
			}			

			$(target).removeAttr('ata-label-field');
			if(comp.property.metafields_labelField){
				var bind = comp.property.metafields_labelField.field;
				$(target).attr('data-label-field', bind);
			}

			$(target).removeAttr('data-value-field');
			if(comp.property.metafields_valueField){
				var bind = comp.property.metafields_valueField.field;
				$(target).attr('data-value-field', bind);
			}

			$(target).removeAttr('data-color-field');
			if(comp.property.metafields_colorField){
				var bind = comp.property.metafields_colorField.field;
				$(target).attr('data-color-field', bind);
			}

			$(target).removeAttr('data-ng-init');
			if(comp.property.metaactions_init){
				var action = comp.property.metaactions_init.key;
				$(target).attr('data-ng-init', action);
			}

		};

		self.runtime = function (target, comp) {			
			$(target).attr('src', '');
		}

	    return self;
	}]);