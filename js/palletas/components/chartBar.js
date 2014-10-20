inject.define("palletas.components.chartBar", [
		"palletas.components.directives.chartBar",
	function (directive) {
	    var self = {};
	    self.name = 'chartBar';
		self.category = 'chart';

		self.directive = directive;

		self.templ = '<img width="50" height="50" src="image/components/chartBar.png" data-bar-chart>';

		self.property = {};
		self.property.width = '100';
		self.property.height = '100';
		self.property.context = 'context';

		self.property.maxPoint = '10';

		self.property.metafields_labelField = '';			
		self.property.metafields_valueField = '';	

		self.property.metaarrays_list = 'list';

		self.update = function (target, comp) {
			$(target).attr('width', comp.property.width);
			$(target).attr('height', comp.property.height);

			if(comp.property.metaarrays_list){
				var data = comp.property.metaarrays_list.replace(':', comp.property.context+'.');	
				$(target).attr('data-chart-data', data);
			}else{
				$(target).removeAttr('data-chart-data');
			}

			if(comp.property.maxPoint){
				var bind = comp.property.maxPoint.replace(/^:\w*\.(\w*)/, '$1');
				$(target).attr('data-max-point', bind);
			}
			else{
				$(target).removeAttr('data-max-point');
			}

			if(comp.property.metafields_labelField){
				var bind = comp.property.metafields_labelField.replace(/^:\w*\.(\w*)/, '$1');
				$(target).attr('data-label-field', bind);
			}
			else{
				$(target).removeAttr('data-label-field');
			}

			if(comp.property.metafields_valueField){
				var bind = comp.property.metafields_valueField.replace(/^:\w*\.(\w*)/, '$1');
				$(target).attr('data-value-field', bind);
			}
			else{
				$(target).removeAttr('data-value-field');
			}			
		};
	    return self;
	}]);