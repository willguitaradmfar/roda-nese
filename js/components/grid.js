var componentes = componentes || {};

componentes.grid = (function () {

	var templ = '<table class="table table-hover">'
					+'<thead><tr>'
						+'<th>Nome<th>'
						+'<th>Tel.<th>'
					+'</tr></thead>'
					+'<tbody>'
						+'<tr data-ng-repeat="">'
							+'<td>Maria<td>'
							+'<td>11...<td>'
						+'</tr>'
					+'</tbody>'
				+'</table>';

	var property = {};
	property.cols = 'Nome,Idade,RG';
	property.rows = 'name,age,rg';
	property.limit = 10;
	property.model = 'model';
	property.filter = 'modelFilter';
	property.select = 'modelSelect';

	var binds = {}
	binds.array = '...';

	var update = function (target, comp) {

		if(comp.property.model 
			&& comp.property.model.length > 0 
			&& comp.binds.array){
			var model = comp.property.model;
			var array = comp.binds.array;
			$(target).find('tbody > tr').attr('data-ng-repeat', '_m in '+model+'.'+array+' | filter:'+comp.property.filter+' | limitTo:'+comp.property.limit);
		}else if(comp.property.model && comp.property.model.length > 0){
			var model = comp.property.model;
			$(target).find('tbody > tr').attr('data-ng-repeat', '_m in '+model+' | filter:'+comp.property.filter+' | limitTo:'+comp.property.limit);
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
				$(target).find('tbody > tr').attr('data-ng-click', 'set(_m, \''+comp.property.select+'\')');
				$(target).find('tbody > tr').append('<td data-ng-bind="_m.'+row+'"></td>');
			}
		}
	};

	return {
		'binds' : binds,
		'templ' : templ,
		'name' : 'grid',
		'property' : property,
		'update' : update,
		'category' : 'grids'
	};
})();