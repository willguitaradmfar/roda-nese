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
	self.property.limit = 10;
	self.property.multitxt_header = 'Col1,Col2,...';
	self.property.metafieldsmulti_cols = '';	
	self.property.metafields_select = 'select';
	self.property.metafields_filter = 'filter';
	self.property.metafields_list = 'list';
	self.property.metaactions_init = '';

	self.update = function (target, comp) {
		
		if(comp.property.metafields_list){
			
			var list = comp.property.metafields_list.key;

			var filter = ((comp.property.metafields_filter) ? '| filter:'+comp.property.metafields_filter.key : '');
			var limitTo = ((comp.property.limit) ? '| limitTo:'+comp.property.limit : '');

			$(target)
				.find('tbody > tr')
				.attr('data-ng-repeat', '_m in '+list+' '+filter+' '+limitTo);
		}
		

		$(target).removeAttr('data-ng-init');
		if(comp.property.metaactions_init){
			var action = comp.property.metaactions_init;
			$(target).attr('data-ng-init', action);
		}

		var cols = comp.property.metafieldsmulti_cols;
		$(target).find('tbody > tr').html('');		

		for(var i in cols){
			var col = cols[i];			
			$(target).find('tbody > tr').attr('data-ng-click', 'set(_m, "'+comp.property.metafields_select.key+'")');
			$(target).find('tbody > tr').append('<td data-ng-bind="_m.'+col.path+'"></td>');			
		}

		var headers = comp.property.multitxt_header.split(',');
		$(target).find('thead > tr').html('');

		if(!comp.property.multitxt_header){
			for(var i in cols){
				var col = cols[i];			
				$(target).find('thead > tr').append('<th>'+col.info+'</th>');
			}

		}else {
			for(var i in headers){
				var header = headers[i];			
				$(target).find('thead > tr').append('<th>'+header+'</th>');
			}
		}
	};
    return self;
}]);