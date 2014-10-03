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

				var label = desenhador.config.internationalization.translate(comp.name, i);
				tr.append('<td>'+label+'</td>');

				var td = $('<td></td>');

				var isMultipleSelect = i.substring(0,5) == 'mult_';

				var select = $('<select '+(isMultipleSelect ? 'multiple' : '')+' name="'+name+'" class="form-control"></select>');
				
				if(!isMultipleSelect)
					select.append('<option value="" selected>Selecione ...</option>');
				
				var services = desenhador.metadata.arrays;

				desenhador.metadata.find({}, function(meta){
					for(var ii in meta.models){
						var model = meta.models[ii];

						var key = ':'+ii;
						var value = meta.resource + ' -> ' + ii;

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
				});				

				td.append(select);
				select.chosen({width:"100%"});
				tr.append(td);

				table.find('tbody').append(tr);
			}

			return table;
		};
	

})(window);