inject.define("core.properties.propertyBuildFields", [
			"config.internationalization", 
			"core.properties.propertyTypes",
			"core.properties.propertyDefault.layout",
			"core.utils.util",
		function (internationalization, types, layout, util) {
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

				if($this.attr('data-body-component') == "" || $this.attr('data-body-component-layout') == ""){
					for(var i in layout.property){
						if(!comp.property[i])
							comp.property[i] = util.clone(layout.property[i]);
					}
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