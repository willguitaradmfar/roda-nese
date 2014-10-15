inject.define("palletas.components.grid", [function () {
    var self = {};
    self.name = 'grid';
	self.category = 'grids';

	self.templ = '<table class="table table-hover">'
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
	self.property.multitxt_header = 'Col1,Col2';
	self.property.metafieldsmulti_cols = '';
	self.property.context = 'context';	
	self.property.metamodels_select = 'select';
	self.property.metamodels_filter = 'filter';
	self.property.metaarrays_list = 'list';

	self.update = function (target, comp) {
		var context = comp.property.context;
		if(comp.property.context && comp.property.metaarrays_list){
			
			var list = comp.property.metaarrays_list.replace(':', context+'.');

			var filter = ((comp.property.metamodels_filter) ? '| filter:'+comp.property.metamodels_filter.replace(':', context+'.') : '');
			var limitTo = ((comp.property.limit) ? '| limitTo:'+comp.property.limit : '');

			$(target)
				.find('tbody > tr')
				.attr('data-ng-repeat', '_m in '+list+' '+filter+' '+limitTo);
		}
		
		var headers = comp.property.multitxt_header.split(',');
		$(target).find('thead > tr').html('');
		for(var i in headers){
			var header = headers[i];			
			$(target).find('thead > tr').append('<th>'+header+'</th>');
		}		

		var cols = comp.property.metafieldsmulti_cols;
		$(target).find('tbody > tr').html('');
		for(var i in cols){
			var col = cols[i];			
			$(target).find('tbody > tr').attr('data-ng-click', 'set(_m, "'+comp.property.metamodels_select.replace(':', context+'.')+'")');
			$(target).find('tbody > tr').append('<td data-ng-bind="_m.'+col.replace(/:\w*\./, '')+'"></td>');
			
		}
	};
    return self;
}]);