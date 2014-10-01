(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.properties = global.desenhador.properties || {};
	global.desenhador.properties.actions = global.desenhador.properties.actions || {};
	var self = global.desenhador.properties.actions;

	self.name = 'ACTIONS';

	self.buildProperty = function (comp) {
			if(!comp.actions)return;
			console.debug('MONTA PROPERTY ACTIONS');			
			var table = $('<table class="table"><thead><tr><th></th><th></th><th></th></tr></thead><tbody></tbody></table>');

			for(var i in comp.actions){
				var property = comp.actions[i];				
				var tr = $('<tr></tr>');
				tr.addClass('warning');
				tr.append('<td>'+i+'</td>');

				var td = $('<td></td>');
				var select = $('<select name="'+i+'" class="form-control"></select>');
				var functions = desenhador.controller.getFunctions();

				for(var ii in functions){
					var option = functions[ii];
					var value = option.value || option;
					var label = option.label || option;
					if(value == property){
						select.append('<option value="'+value+'" selected>'+label+'</option>');
						continue;
					}
					select.append('<option value="'+value+'">'+label+'</option>');
				}
				td.append(select);
				tr.append(td);
				table.find('tbody').append(tr);
			}
			return table;
		};

})(window);