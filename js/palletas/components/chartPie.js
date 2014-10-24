inject.define("palletas.components.chartPie", [
		"palletas.components.directives.chartPie",
	function (directive) {
	    var self = {};
	    self.name = 'chartPie';
		self.category = 'chart';

		self.directive = directive;

		self.templ = '<img width="50" height="50" src="image/components/chartPie.png" data-pie-chart>';

		self.property = {};
		self.property.width = '200';
		self.property.height = '200';
		self.property.metacontext_context = 'context';

		self.property.metafields_labelField = '';			
		self.property.metafields_valueField = '';
		self.property.metafields_colorField = '';

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
				var action = comp.property.metaactions_init;
				$(target).attr('data-ng-init', action);
			}

		};

		self.runtime = function (target, comp) {			
			$(target).attr('src', '');
		}

	    return self;
	}]);