var desenhador = desenhador || {};

(function(desenhador) {
	desenhador.property = desenhador.property || {};

	desenhador.property = function (comp) {
		this._contruct = function (comp) {	

			console.debug('MONTANDO PROPRIEDADES '+comp.name);

			var table = $('<table class="table"><thead><tr><th>Propriedade</th></tr></thead><tbody></tbody></table>');

			for(var i in comp.property){
				console.debug(i+'::'+comp.property[i]);
				var tr = $('<tr></tr>');
				tr.append('<td>'+i+'</td>');

				var td = $('<td></td>');				
				if(typeof comp.property[i] === 'object' && comp.property[i].options){

					var select = $('<select name="'+i+'" class="form-control"></select>');
					
					for(var ii in comp.property[i].options){
						var option = comp.property[i].options[ii];
						var value = option.value || option;
						var label = option.label || option;

						if(comp.property[i].val === value){
							select.append('<option value="'+option+'" selected>'+option+'</option>');
						}else{
							select.append('<option value="'+option+'">'+option+'</option>');	
						}
					}
					td.append(select);				
				}
				else{
					var input = $('<input name="'+i+'" type="text" class="form-control" value="'+comp.property[i]+'"></input>');
					td.append(input);
				}				
				
				tr.append(td);
				table.find('tbody').append(tr);
			}	
			this.table = table.html();
		};

		this.getTable = function (argument) {
			return this.table;
		}

		this._contruct(comp);
	};		
	
	console.log(desenhador);

})(desenhador);