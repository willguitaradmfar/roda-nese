(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.componentes = global.desenhador.componentes || {};
	global.desenhador.componentes.grid = global.desenhador.componentes.grid || {};
	var self = global.desenhador.componentes.grid;

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
	self.property.tags_header = 'Col1,Col2';
	self.property.context = 'context';

	self.binds = {};
	self.binds.m_cols = {};	

	self.arrays = {};
	self.arrays.lista = '...';

	self.models = {};
	self.models.select = 'select';
	self.models.filter = 'filter';

	self.update = function (target, comp) {
		var context = comp.property.context;
		if(comp.property.context && comp.arrays.lista){
			
			var lista = comp.arrays.lista.replace(':', context+'.');

			var filter = ((comp.models.filter) ? '| filter:'+comp.models.filter.replace(':', context+'.') : '');
			var limitTo = ((comp.property.limit) ? '| limitTo:'+comp.property.limit : '');

			$(target)
				.find('tbody > tr')
				.attr('data-ng-repeat', '_m in '+lista+' '+filter+' '+limitTo);
		}
		
		var headers = comp.property.tags_header.split(',');
		$(target).find('thead > tr').html('');
		for(var i in headers){
			var header = headers[i];
			var parts = header.split('.');
			$(target).find('thead > tr').append('<th>'+parts[parts.length-1]+'</th>');
		}		

		var cols = comp.binds.m_cols;
		$(target).find('tbody > tr').html('');
		for(var i in cols){
			var col = cols[i];			
			$(target).find('tbody > tr').attr('data-ng-click', 'set(_m, "'+comp.models.select.replace(':', context+'.')+'")');
			$(target).find('tbody > tr').append('<td data-ng-bind="_m.'+col.replace(/:\w*\./, '')+'"></td>');
			
		}
	};


})(window);