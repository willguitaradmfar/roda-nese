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
				if(typeof property === 'object' && property.options){
					var select = $('<select name="'+name+'" class="form-control"></select>');

					for(var ii in property.options){
						var option = property.options[ii];
						var value = option.value || option;
						var label = option.label || option;

						if(property.val === value){
							select.append('<option value="'+value+'" selected>'+label+'</option>');
							continue;
						}
						select.append('<option value="'+value+'">'+label+'</option>');
					}
					td.append(select);
				}else{
					var input = $('<input name="'+name+'" type="text" class="form-control" value="'+property+'"></input>');
					td.append(input);
				}
				tr.append(td);
				table.find('tbody').append(tr);
			}
			return table;
		};

})(window);