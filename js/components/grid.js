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
	self.property.cols = 'C1, C2';
	self.property.rows = 'c1, c2';
	self.property.limit = 10;
	self.property.context = 'context';

	self.arrays = {}
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

		if(comp.property.cols && comp.property.cols.length > 0){
			var cols = [];
			var _cols = comp.property.cols.split(',');
			$(target).find('thead > tr').html('');
			for(var i in _cols){
				var col = _cols[i];
				$(target).find('thead > tr').append('<th>'+col+'</th>');
			}
		}

		if(comp.property.rows && comp.property.rows.length > 0){
			var rows = [];
			var _rows = comp.property.rows.split(',');
			$(target).find('tbody > tr').html('');
			for(var i in _rows){
				var row = _rows[i];
				$(target).find('tbody > tr').attr('data-ng-click', 'set(_m, '+comp.models.select.replace(':', context+'.')+')');
				$(target).find('tbody > tr').append('<td data-ng-bind="_m.'+row+'"></td>');
			}
		}
	};


})(window);