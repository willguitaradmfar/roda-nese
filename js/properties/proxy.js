inject.define("properties.proxy", [
			"config.internationalization", 
			"properties.types",
			"properties.defatulProperty.layout",
		function (internationalization, types, layout) {
			var self = {};
			self.name = 'BASIC';

			self.buildProperty = function (comp, $this) {			
				if(!comp.property)return;
				console.debug('MONTA PROPERTY BASIC');

				var tabs  = {};

				var getTab = function (name) {
					if(tabs[name]){
						return tabs[name]
					}
					tabs[name] = $('<table class="table"><thead><tr><th width="30%"></th><th></th></tr></thead><tbody></tbody></table>');
					return tabs[name]
				}

				for(var i in layout.property){					
					comp.property[i] = layout.property[i];
				}				

				for(var i in comp.property){
					var componentType = i.substring(0,i.indexOf('_')) || 'txt';					

					var property = comp.property[i];
					var tr = $('<tr></tr>');				
					var label = internationalization.translate(comp.name, i);
					tr.append('<td>'+label+'</td>');				
					
					var module = types.types[componentType];
					if(!module) throw 'NAO ENCONTRADO DEFINICAO PARA ESSE "componentType" ['+componentType+']';

					var td = $('<td></td>');
					module.make(comp, i, property, td, $this)

					tr.append(td);
					getTab(property.category || 'basic').find('tbody').append(tr);
				}


				return tabs;
			};		

			return self;	
		}]);