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
				
				var tr = $('<tr></tr>');
				tr.addClass('success');
				tr.append('<td>'+i+'</td>');

				var td = $('<td></td>');

				var select = $('<select name="'+i+'" class="form-control"></select>');

				if(i == 'array'){
					var services = desenhador.metadata.arrays;

					for(var ii in services){
						var array = services[ii];
						var nameservice = ii;

						for(var iii in array){
							var field = iii;
							var before = array[iii].before;

							for(var b in array[iii].before){before = b}

							before += field;

							if(before == property){
								select.append('<option value="'+before+'" selected>'+nameservice+' -> '+field+' [array]</option>');
								continue;
							}
							select.append('<option value="'+before+'">'+nameservice+' -> '+field+' [array]</option>');
						}
					}

				}else if(i == 'model'){

				}else if(i == 'field'){
					var services = desenhador.metadata.arrays;

					for(var ii in services){
						var arrays = services[ii];
						var nameservice = ii;

						for(var iii in arrays){
							var field = iii;							
							var afters = arrays[iii].after;

							for(var a in afters){
								var afterType = afters[a];

								if(a == property){
									select.append('<option value="'+a+'" selected>'+field+' -> '+a+' ['+afterType+']</option>');
									continue;
								}
								select.append('<option value="'+a+'">'+field+' -> '+a+' ['+afterType+']</option>');
							}							
						}
					}
				}

				td.append(select);
				tr.append(td);

				table.find('tbody').append(tr);
			}

			return table;
		};
	

})(window);