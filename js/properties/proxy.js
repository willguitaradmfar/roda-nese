inject.define("properties.proxy", [
			"config.internationalization", 
			"properties.types",
		function (internationalization, types) {
			var self = {};
			self.name = 'BASIC';

			self.buildProperty = function (comp) {			
				if(!comp.property)return;
				console.debug('MONTA PROPERTY BASIC');
				var table = $('<table class="table"><thead><tr><th width="30%"></th><th></th></tr></thead><tbody></tbody></table>');

				for(var i in comp.property){
					var property = comp.property[i];
					var tr = $('<tr></tr>');				
					var label = internationalization.translate(comp.name, i);
					tr.append('<td>'+label+'</td>');				

					var componentType = i.substring(0,i.indexOf('_')) || 'txt';					
					
					var module = types.types[componentType];
					if(!module) throw 'NAO ENCONTRADO DEFINICAO PARA ESSE "componentType" ['+componentType+']';
					var td = $('<td></td>');
					module.make(comp, i, property, td)

					tr.append(td);
					table.find('tbody').append(tr);
				}
				return table;
			};
			return self;	
		}]);