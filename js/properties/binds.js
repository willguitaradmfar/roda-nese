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

				var label = desenhador.config.internationalization.translate(comp.name, i);
				tr.append('<td>'+label+'</td>');

				var td = $('<td></td>');

				var isMultipleSelect = i.substring(0,5) == 'mult_';				

				var select = $('<select '+(isMultipleSelect ? 'multiple' : '')+' name="'+name+'" class="form-control"></select>');
				
				if(!isMultipleSelect)
					select.append('<option value="" selected>Selecione ...</option>');
				
				var services = desenhador.metadata.arrays;

				var recursive = function (model, meta, modelName) {
					for(var  iii in model){
						var field = model[iii];
						var type = field.type;						
						
						if(type.substring(0,1) == ':') {
							recursive(field.ref, meta, type.replace(/:/, modelName+'.'));
							continue;
						}

						var key = ':'+modelName+'.'+iii;
						var value = meta.resource + ' -> ' + modelName+'.'+iii+'['+type+']';					

						if(typeof property == 'object' 
							&& property.length
							&& property.indexOf(key) >= 0){
							select.append('<option value="'+key+'" selected>'+value+'</option>');
						}else if(key == property){
							select.append('<option value="'+key+'" selected>'+value+'</option>');
						}else{
							select.append('<option value="'+key+'">'+value+'</option>');
						}
					}
				}

				desenhador.metadata.find({}, function(meta){
					for(var ii in meta.models){
						var model = meta.models[ii];
						var modelName = ii;						
						recursive(model, meta, modelName);
					}
				});				

				td.append(select);
				select.chosen({width:"100%"});
				tr.append(td);

				table.find('tbody').append(tr);
			}

			return table;
		};
	

})(window);