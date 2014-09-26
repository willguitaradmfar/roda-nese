var desenhador = desenhador || {};

(function(desenhador) {
	desenhador.property = desenhador.property || {};

	desenhador.property = function () {

		var accordion;

		this.buildBarraDeBotoes = function () {
			var barraBotoes = $('<div><div class="dropdown">'
								+'<span class="btn btn-success dropdown-toggle glyphicon glyphicon-refresh refreshComponent" type="button"></span>'
								+'<span>.</span>'
								+'<span class="btn btn-danger dropdown-toggle glyphicon glyphicon-trash removeComponent" type="button"></span>'
								+'</div><br/></div>');
			return barraBotoes;
		}

		this.buildAccordion = function () {

			var _accordion = $('<div class="panel-group" id="accordion-property"></div>');

			var add = function (name, content) {
				if(!content)return;
				var property = $('<div class="panel panel-default"></div>')
				var hProperty = $('<div class="panel-heading"><h4 class="panel-title"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-property" href="#'+name+'"> '+name+'</a></h4></div>');
				var bProperty = $('<div id="'+name+'" class="panel-collapse collapse "><div class="panel-body"></div></div>');
				bProperty.find('.panel-body').append(content);
				property.append(hProperty).append(bProperty);
				_accordion.append(property);
			}

			return {
				'add' : add,
				'accordion' : _accordion
			};
		};

		this.buildTableProperty = function (comp) {
			if(!comp.property)return;

			console.debug('MONTA TABELA DE PROPRIEDADES');
			var table = $('<table class="table"><thead><tr><th></th><th></th><th></th></tr></thead><tbody></tbody></table>');

			for(var i in comp.property){
				var property = comp.property[i];

				console.debug('property -> '+i+'::'+property);

				var tr = $('<tr></tr>');
				tr.append('<td>'+i+'</td>');

				var td = $('<td></td>');
				if(typeof property === 'object' && property.options){
					var select = $('<select name="'+i+'" class="form-control"></select>');

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
					var input = $('<input name="'+i+'" type="text" class="form-control" value="'+property+'"></input>');
					td.append(input);
				}
				tr.append(td);
				table.find('tbody').append(tr);
			}
			return table;
		};

		this.buildTableAction = function (comp) {
			if(!comp.actions)return;

			console.debug('MONTA TABELA DE AÇÕES');
			var table = $('<table class="table"><thead><tr><th></th><th></th><th></th></tr></thead><tbody></tbody></table>');

			for(var i in comp.actions){
				var property = comp.actions[i];

				console.debug('actions -> '+i+'::'+property);
				var tr = $('<tr></tr>');
				tr.addClass('warning');
				tr.append('<td>'+i+'</td>');

				var td = $('<td></td>');

				var select = $('<select name="'+i+'" class="form-control"></select>');

				var functions = desenhador.controller.getFunctions();

				for(var ii in functions){
					var option = functions[ii];
					var value = option.value || option;
					var label = option.label || option;
					if(value == property){
						select.append('<option value="'+value+'" selected>'+label+'</option>');
						continue;
					}

					select.append('<option value="'+value+'">'+label+'</option>');

				}
				td.append(select);
				tr.append(td);

				table.find('tbody').append(tr);
			}

			return table;
		};

		this.buildTableBinds = function (comp) {
			if(!comp.binds)return;

			console.debug('MONTA TABELA DE BINDS');
			var table = $('<table class="table"><thead><tr><th></th><th></th><th></th></tr></thead><tbody></tbody></table>');

			for(var i in comp.binds){
				var property = comp.binds[i];

				console.debug(i+'::'+property);
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

		this.clickOpenProperty = function () {

			var self = this;

			$('.project-container, .datasource-container').on('dblclick', '.component, .nonvisual', function () {

				var $this = $(this);

				console.debug('dblclick em componente já arrastado !!! :: '+$(this));

				if(!$(this).attr('comp')){
					console.warn('COMPONENTE CLICADO NAO TEM O ATRIBUTO (comp)');
					return;
				}

				var comp = JSON.parse($(this).attr('comp'));
				comp.update = desenhador.util.eval(comp.update);
				comp.remove = desenhador.util.eval(comp.remove);

				//POVOAR AÇÕES DE CONTROLER EM OPÇÕES DE COMPONENTES
				//povoarAction(comp, desenhador.controller.getFunctions());

				desenhador.controller.update();
				desenhador.metadata.update();

				//self._contruct(comp);

				accordion = self.buildAccordion();

				accordion.add('Prop', self.buildTableProperty(comp));
				accordion.add('Action', self.buildTableAction(comp));
				accordion.add('Binds', self.buildTableBinds(comp));

				var frame = self.buildBarraDeBotoes();

				frame.append(accordion.accordion);

				$( "#dialog" ).html('');
				$( "#dialog" ).html(frame);

				var btnremover = frame.find('.removeComponent');

				btnremover.on('click', function () {
					$this.remove();
					console.debug('CHAMANDO A FUNCAO REMOVE DO COMPONENTE');
					if(comp.remove)comp.remove($this, comp);
					$( "#dialog" ).dialog( "close" );
				});

				$( "#dialog" ).dialog({title : (comp.name || comp.property.nameService)});
				$( "#dialog" ).dialog( "open" );

				var updatePropertyPerField = function (_this, _comp) {
					var name = $(_this).attr('name');
					var val = $(_this).val();

					if(_comp.property && _comp.property[name] && _comp.property[name].val){
						_comp.property[name].val = val;
					}  else	if(_comp.property && _comp.property[name]){
						_comp.property[name] = val;
					}

					if(_comp.actions && _comp.actions[name]){
						_comp.actions[name] = val;
					}
					if(_comp.binds && _comp.binds[name]){
						_comp.binds[name] = val;
					}
				};

				var updatePropertyComp = function($_this, _comp) {
					desenhador.util.updateCompSerializable($_this, _comp);
					console.debug('UPDATE COMPONENT : ('+(_comp.name || _comp.property.nameService)+')');
					_comp.update($_this, _comp, function () {
						desenhador.util.updateCompSerializable($_this, _comp);
					});
				}

				var btnrefresh = frame.find('.refreshComponent');

				btnrefresh.on('click', function () {
					var allComponents = frame.find('input, select');
					allComponents.each(function (i, c) {
						updatePropertyPerField(c, comp);
					});
					updatePropertyComp($this, comp);
				});
			});
		};
	};

})(desenhador);