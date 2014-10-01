(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.properties = global.desenhador.properties || {};
	global.desenhador.properties.arrays = global.desenhador.properties.arrays || {};
	var self = global.desenhador.properties.arrays;

	self.name = 'ARRAYS';

	self.buildProperty = function (comp) {
			if(!comp.arrays)return;
			console.debug('MONTA TABELA DE ARRAYS');
			var table = $('<table class="table"><thead><tr><th></th><th></th><th></th></tr></thead><tbody></tbody></table>');

			for(var i in comp.arrays){
				var property = comp.arrays[i];

				var name = 'arrays.'+i;
				
				var tr = $('<tr></tr>');
				tr.addClass('success');
				tr.append('<td>'+i+'</td>');

				var td = $('<td></td>');

				var select = $('<select name="'+name+'" class="form-control"></select>');
				var services = desenhador.metadata.arrays;

				desenhador.metadata.find({}, function(meta){

						for(var ii in meta.actions){
							var action = meta.actions[ii];
							var result = action.result;						
							var type = result.type; 
							var model = result.model;

							if(type != 'array') continue;

							var key = model+'List';
							var value = meta.resource + ' -> '+model.replace(/:/g, '')+'['+type+']';							

							if(key == property)
								select.append('<option value="'+key+'" selected>'+value+'</option>');
							else
								select.append('<option value="'+key+'">'+value+'</option>');							
						}
					});			

				td.append(select);
				tr.append(td);

				table.find('tbody').append(tr);
			}

			return table;
		};
	

})(window);