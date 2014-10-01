(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.properties = global.desenhador.properties || {};
	global.desenhador.properties.binds = global.desenhador.properties.binds || {};
	var self = global.desenhador.properties.binds;

	self.name = 'BINDS';

	self.buildProperty = function (comp) {
			if(!comp.binds)return;
			console.debug('MONTA TABELA DE BINDS');
			var table = $('<table class="table"><thead><tr><th></th><th></th><th></th></tr></thead><tbody></tbody></table>');

			for(var i in comp.binds){
				var property = comp.binds[i];

				var name = 'binds.'+i;
				
				var tr = $('<tr></tr>');
				tr.addClass('success');
				tr.append('<td>'+i+'</td>');

				var td = $('<td></td>');

				var select = $('<select name="'+name+'" class="form-control"></select>');
				
				var services = desenhador.metadata.arrays;

				desenhador.metadata.find({}, function(meta){
					for(var ii in meta.models){
						var model = meta.models[ii];
						for(var  iii in model){
							var field = model[iii];
							var type = field.type;
							if(type.substring(0,1) == ':') continue;

							var key = ':'+ii+'.'+iii;
							var value = meta.resource + ' -> ' + ii+'.'+iii+'['+type+']';

							if(key == property)
								select.append('<option value="'+key+'" selected>'+value+'</option>');
							else
								select.append('<option value="'+key+'">'+value+'</option>');
						}
					}
				});				

				td.append(select);
				tr.append(td);

				table.find('tbody').append(tr);
			}

			return table;
		};
	

})(window);