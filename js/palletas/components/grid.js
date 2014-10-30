inject.define("palletas.components.grid", [function () {
    var self = {};
    self.name = 'grid';
	self.category = 'grids';

	self.templ = '<table class="table table-hover table-condensed">'
					+'<thead><tr>'
						+'<th>C1<th>'
						+'<th>C2<th>'
					+'</tr></thead>'
					+'<tbody>'
						+'<tr data-ng-repeat="">'
							+'<td>R1<td>'
							+'<td>R2<td>'
						+'</tr>'
					+'</tbody>'
				+'</table>';

	self.property = {};

	self.property.limit = {
		val : 10,
		update : function (target, val) {
			
		}
	};

	self.property.multitxt_header = {
		val : 'Col1, Col2',
		update : function (target, val, comp) {
			var headers = val.split(',');
			$(target).find('thead > tr').html('');
			
			for(var i in headers){
				var header = headers[i];			
				$(target).find('thead > tr').append('<th>'+header+'</th>');
			}
			
		}
	};

	self.property.metafieldsmulti_cols = {
		config : {
			types : ['string', 'number', 'date']
		},
		update : function (target, val, comp) {
			var cols = val;
			$(target).find('tbody > tr').html('');
			for(var i in cols){
				var col = cols[i];
				if(comp.property.metafields_select
					&& comp.property.metafields_select.val){
						$(target).find('tbody > tr').attr('data-ng-click', 'set(_m, "'+comp.property.metafields_select.val.key+'")');	
				}
				
				$(target).find('tbody > tr').append('<td data-ng-bind="_m.'+col.path+'"></td>');			
			}
		}
	};
	
	self.property.metafields_filter = {
		config : {
			types : ['object']
		}
	};

	self.property.metafields_select = {
		config : {
			types : ['object']
		}
	};
	self.property.metafields_list = {
		config : {
			types : ['array']
		},
		update : function (target, val, comp) {
			if(val){				

				var list = val.key;
				var filter = ((comp.property.metafields_filter.val) ? '| filter:'+comp.property.metafields_filter.val.key : '');				

				$(target)
					.find('tbody > tr')
					.attr('data-ng-repeat', '_m in '+list+' '+filter);
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
	
    return self;
}]);