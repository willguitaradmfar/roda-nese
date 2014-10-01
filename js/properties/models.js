(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.properties = global.desenhador.properties || {};
	global.desenhador.properties.models = global.desenhador.properties.models || {};
	var self = global.desenhador.properties.models;

	self.name = 'MODELS';

	self.buildProperty = function (comp) {
			if(!comp.models)return;
			console.debug('MONTA TABELA DE MODELS');
			var table = $('<table class="table"><thead><tr><th></th><th></th><th></th></tr></thead><tbody></tbody></table>');

			for(var i in comp.models){
				var property = comp.models[i];

				var name = 'models.'+i;
				
				var tr = $('<tr></tr>');
				tr.addClass('success');
				tr.append('<td>'+i+'</td>');

				var td = $('<td></td>');

				var select = $('<select name="'+name+'" class="form-control"></select>');
				
				var services = desenhador.metadata.arrays;

				desenhador.metadata.find({}, function(meta){
					for(var ii in meta.models){
						var model = meta.models[ii];

						var key = ':'+ii;
						var value = meta.resource + ' -> ' + ii;

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