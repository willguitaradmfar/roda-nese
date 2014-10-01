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
				var property = $('<div class="panel panel-default"></div>');
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

		this.clickOpenProperty = function () {
			var self = this;

			var removerComponente = function ($this, comp) {
				desenhador.util.removeCompDB($this);
				$this.remove();
				if(comp.remove)comp.remove($this, comp);					
				$( "#dialog" ).dialog( "close" );
			};

			var dblclickProperty = function ($this) {
				var comp = desenhador.util.getCompDBById($this, 'data-comp-id');

				console.debug('dblclick em componente já arrastado '+comp.___id+' !!! :: ');

				desenhador.controller.update();
				desenhador.metadata.update();			

				accordion = self.buildAccordion();

				for(var i in desenhador.properties){
					var p = desenhador.properties[i];
					accordion.add(desenhador.properties[i].name, desenhador.properties[i].buildProperty(comp));
				}

				var frame = self.buildBarraDeBotoes();
				frame.append(accordion.accordion);

				$( "#dialog" ).html('');
				$( "#dialog" ).html(frame);

				var btnremover = frame.find('.removeComponent');
				btnremover.on('click', function () {					
					removerComponente($this, comp);
				});

				$( "#dialog" ).dialog({title : (comp.name || comp.property.nameService) + ' '+comp.___id});
				$( "#dialog" ).dialog( "open" );

				var updatePropertyPerField = function (_this, _comp) {					
					var name = $(_this).attr('name');
					var val = $(_this).val();

					var sufix = name.split('.')[1];

					if(_comp.property && _comp.property[sufix] && _comp.property[sufix].val){
						_comp.property[sufix].val = val;
					}  else	{
						eval('comp.'+name + ' = "'+val+'"');					
					}					
				};

				var updatePropertyComp = function($_this, _comp) {					
					desenhador.util.updateCompDB($_this, _comp);
					console.debug('UPDATE COMPONENT : ('+(_comp.name || _comp.property.nameService) + ' '+comp.___id+')');
					_comp.update($_this, _comp, function () {
						desenhador.util.updateCompDB($_this, _comp);
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
			};

			$('.project-container, .datasource-container').on('dblclick', '.component, .nonvisual', function () {

				var $this = $(this);
				dblclickProperty($this);
			});
		};
	};

})(desenhador);