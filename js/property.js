var desenhador = desenhador || {};

(function(desenhador) {
	desenhador.property = desenhador.property || {};

	desenhador.property = function () {		

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
			this.table = table;
		};

		this.clickOpenProperty = function () {

			var self = this;

			$('.project-container, .datasource-container').on('dblclick', '.component', function () {

				var $this = $(this);

				console.debug('dblclick em componente já arrastado !!! :: '+$(this).attr('comp'));					

				if(!$(this).attr('comp')){
					console.warn('COMPONENTE CLICADO NAO TEM O ATRIBUTO (comp)');
					return;
				}

				var comp = JSON.parse($(this).attr('comp'));
				comp.update = desenhador.util.eval(comp.update);
				comp.remove = desenhador.util.eval(comp.remove);

				//POVOAR AÇÕES DE CONTROLER EM OPÇÕES DE COMPONENTES
				//povoarAction(comp, desenhador.controller.getFunctions());

				desenhador.util.updateCompSerializable($this, comp);				
				
				self._contruct(comp);

				$( "#dialog" ).html('');
				$( "#dialog" ).html(self.getTable());

				var btnremover = $('<hr/><span class="btn btn-danger glyphicon glyphicon-remove"> Remover</span>');

				btnremover.on('click', function () {
					$this.remove();
					console.debug('CHAMANDO A FUNCAO REMOVE DO COMPONENTE');				
					if(comp.remove)comp.remove($this, comp);
					$( "#dialog" ).dialog( "close" );
				});

				$( "#dialog" ).append(btnremover);
				$( "#dialog" ).dialog( "open" );


				var update = function (_this) {				
					var name = $(_this).attr('name');				
					var val = $(_this).val();
				

					if(comp.property[name].val)
						comp.property[name].val = val;
					else
						comp.property[name] = val;
				
					desenhador.util.updateCompSerializable($this, comp);
					
					console.debug('UPDATE COMPONENT :'+comp.name);
					comp.update($this, comp);
					console.debug('LOST-FOCUS '+name+':'+val);
				};

				$( "#dialog" ).off('focusout', 'input, select');
				$( "#dialog" ).on('focusout', 'input, select', function() {
					update(this);
				});

				$( "#dialog" ).off('change', 'select');
				$( "#dialog" ).on('change', 'select', function() {
					update(this);
				});
				
			});
		};

		this.getTable = function (argument) {
			return this.table;
		}		
	};		
	
	console.log(desenhador);

})(desenhador);