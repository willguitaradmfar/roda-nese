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
		self.property.metacontext_context = 'context';

		self.property.maxPoint = '10';

		self.property.metafields_labelField = '';			
		self.property.metafields_valueField = '';	

		self.property.metaarrays_list = 'list';

		self.property.metaactions_init = '';

		self.update = function (target, comp) {
			$(target).attr('width', comp.property.width);
			$(target).attr('height', comp.property.height);

			$(target).removeAttr('data-chart-data');
			if(comp.property.metaarrays_list){
				var data = comp.property.metaarrays_list.replace(':', comp.property.metacontext_context+'.');	
				$(target).attr('data-chart-data', data);
			}

			$(target).removeAttr('data-max-point');
			if(comp.property.maxPoint){
				var bind = comp.property.maxPoint.replace(/^:\w*\.(\w*)/, '$1');
				$(target).attr('data-max-point', bind);
			}

			$(target).removeAttr('data-label-field');
			if(comp.property.metafields_labelField){
				var bind = comp.property.metafields_labelField.replace(/^:\w*\.(\w*)/, '$1');
				$(target).attr('data-label-field', bind);
			}

			$(target).removeAttr('data-value-field');
			if(comp.property.metafields_valueField){
				var bind = comp.property.metafields_valueField.replace(/^:\w*\.(\w*)/, '$1');
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