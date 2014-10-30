inject.define("palletas.components.h1", [		
	function () {
	    var self = {};
	    self.name = 'h1';
		self.category = 'label';

		self.templ = '<h1>H1</h1>';

		self.property = {};

		self.property.label = {
			val : 'H1',
			update : function (target, val, comp) {
				$(target).text(val);
			}
		};

		self.property.metafields_field = {
			config : {
				types : ['string', 'number', 'date']
			},
			update : function (target, val, comp) {
				if(val.key){
					var bind = val.key;
					$(target).attr('data-ng-bind', bind);
				}else{
					$(target).removeAttr('data-ng-bind');
				}
			}
		};
		
	    return self;

	}]);