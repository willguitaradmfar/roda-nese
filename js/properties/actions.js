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

					var name = 'actions.'+i;

					var td = $('<td></td>');
					var select = $('<select name="'+name+'" class="form-control"></select>');
					select.append('<option value="" selected>Selecione ...</option>');
					var functions = desenhador.controller.getFunctions();
					desenhador.metadata.find({}, function(meta){						

						for(var ii in meta.actions){
							var action = meta.actions[ii];
							for(var  iii in action.parameter){
								var parameter = action.parameter[iii];
								var parameters = parameter.join(', ');

								var key = meta.resource+'.'+ii+'('+parameters+')';
								var value = meta.resource + ' -> ' + ii+'('+parameters.replace(/:/g, '')+')';

								if(key == property)
									select.append('<option value="'+key+'" selected>'+value+'</option>');
								else
									select.append('<option value="'+key+'">'+value+'</option>');
							}
						}
					});
					td.append(select);
					select.chosen({width:"100%"});
					tr.append(td);
					table.find('tbody').append(tr);
				}			

			//AQUI POSSO DEVOLVER ASYNCRONO, NÃO PERDE A REFERENCIA
			return table;
		};

})(window);