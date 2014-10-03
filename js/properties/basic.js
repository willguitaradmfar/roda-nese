(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.properties = global.desenhador.properties || {};
	global.desenhador.properties.basic = global.desenhador.properties.basic || {};
	var self = global.desenhador.properties.basic;

	self.name = 'BASIC';

	self.buildProperty = function (comp) {			
			if(!comp.property)return;
			console.debug('MONTA PROPERTY BASIC');
			var table = $('<table class="table"><thead><tr><th></th><th></th><th></th></tr></thead><tbody></tbody></table>');

			for(var i in comp.property){
				var property = comp.property[i];
				var tr = $('<tr></tr>');
				tr.append('<td>'+i+'</td>');

				var name = 'property.'+i;

				var td = $('<td></td>');

				var isMultipleSelect = i.substring(0,2) == 'm_';
				var isTagsInsert = i.substring(0,5) == 'tags_';

				if(typeof property === 'object' && property.options){
					var select = $('<select '+(isMultipleSelect ? 'multiple' : '')+' name="'+name+'" class="form-control"></select>');				

					for(var ii in property.options){
						var option = property.options[ii];
						var key = option.value || option;
						var value = option.label || option;

						if(typeof property == 'object' 
							&& property.length
							&& property.indexOf(key) >= 0){
							select.append('<option value="'+key+'" selected>'+value+'</option>');
						}else if(key == property.val){
							select.append('<option value="'+key+'" selected>'+value+'</option>');
						}else{
							select.append('<option value="'+key+'">'+value+'</option>');
						}
					}
					td.append(select);
					select.chosen({width:"100%"});
				}else{
					var input = $('<input name="'+name+'" type="text" class="form-control" value="'+property+'"></input>');					
					td.append(input);	
					if(isTagsInsert){
						input.tagsinput();
					}
				}
				tr.append(td);
				table.find('tbody').append(tr);
			}
			return table;
		};

})(window);