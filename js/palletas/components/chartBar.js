inject.define("palletas.components.chartBar", [
		"palletas.components.directives.chartBar",
	function (directive) {
	    var self = {};
	    self.name = 'chartBar';
		self.category = 'chart';

		self.directive = directive;

		self.templ = '<img width="50" height="50" src="image/components/chartBar.png" data-bar-chart>';

		self.property = {};
		self.property.width = '400';
		self.property.height = '200';		

		self.property.maxPoint = '10';

		self.property.metafields_labelField = '';			
		self.property.metafields_valueField = '';	

		self.property.metafields_list = 'list';

		self.property.metaactions_init = '';

		self.update = function (target, comp) {
			$(target).attr('width', comp.property.width);
			$(target).attr('height', comp.property.height);

			$(target).removeAttr('data-chart-data');
			if(comp.property.metafields_list){
				var data = comp.property.metafields_list.key;
				$(target).attr('data-chart-data', data);
			}

			$(target).removeAttr('data-max-point');
			if(comp.property.maxPoint){
				var bind = comp.property.maxPoint;
				$(target).attr('data-max-point', bind);
			}

			$(target).removeAttr('data-label-field');
			if(comp.property.metafields_labelField){
				var bind = comp.property.metafields_labelField.field;
				$(target).attr('data-label-field', bind);
			}

			$(target).removeAttr('data-value-field');
			if(comp.property.metafields_valueField){
				var bind = comp.property.metafields_valueField.field;
				$(target).attr('data-value-field', bind);
			}

			$(target).removeAttr('data-ng-init');
			if(comp.property.metaactions_init){
				var action = comp.property.metaactions_init;
				$(target).attr('data-ng-init', action);
			}
		};

		self.runtime = function (target, comp) {			
			$(target).attr('src', '');
		}
	    return self;
	}]);