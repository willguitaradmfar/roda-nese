inject.define("palletas.components.chartLine", [
		"palletas.components.directives.chartLine",
	function (directive) {
	    var self = {};
	    self.name = 'chartLine';
		self.category = 'chart';

		self.directive = directive;

		self.templ = '<img width="50" height="50" src="image/components/chartLine.png" data-line-chart>';

		self.property = {};

		self.property.width = {
			val : '400',
			update : function (target, val, comp) {
				$(target).attr('width', val);
			}
		};
		self.property.height = {
			val : '200',
			update : function (target, val, comp) {
				$(target).attr('height', val);
			}
		};		

		self.property.maxPoint = {
			val : '10',
			update : function (target, val, comp) {
				$(target).removeAttr('data-max-point');
				if(val){
					var bind = val;
					$(target).attr('data-max-point', bind);
				}
			}
		};		

		self.property.metafields_labelField = {
			config : {
				types : ['string']
			},
			update : function (target, val, comp) {
				$(target).removeAttr('data-label-field');
				if(val){
					var bind = val.field;
					$(target).attr('data-label-field', bind);
				}
			}
		};

		self.property.metafields_valueField = {
			config : {
				types : ['number']
			},
			update : function (target, val, comp) {
				$(target).removeAttr('data-value-field');
				if(val){
					var bind = val.field;
					$(target).attr('data-value-field', bind);
				}
			}
		};

		self.property.metafields_list = {
			config : {
				types : ['array']
			},
			update : function (target, val, comp) {
				$(target).removeAttr('data-chart-data');
				if(val){
					var data = val.key;
					$(target).attr('data-chart-data', data);
				}
			}
		};

		self.property.metaactions_init = {
			config : {
				types : ['action']
			},
			update : function (target, val, comp) {
				$(target).removeAttr('data-ng-init');
				if(val){
					var action = val.key;
					$(target).attr('data-ng-init', action);
				}
			}
		};

		self.runtime = function (target, comp) {			
			$(target).attr('src', '');
		}
	    return self;
	}]);