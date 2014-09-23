logQueue.urlPost = "http://172.16.84.95:3000/";
logQueue.objHeader.tenant = 'DESENHADOR';
logQueue.objHeader.session = 'S-'+Math.round(Math.random()*10000);
logQueue.showMessageConsole = true;
logQueue.qtdeMessageSent = 500;
logQueue.debug = false;
logQueue.trace = true;
logQueue.sleepThread = 1000;
//logQueue.start();

$(function () {

	var povoarAction = function (comp, actions) {
		var properties = comp.property;		
		for(var i in properties){
			var property = properties[i];
			if(i.substr(0, 6) === 'action'){
				properties[i] = {val : property.val, options : actions};
			}
			
		}
	};
		
	var pluginDraggable = function () {
		$( ".project-container" ).sortable({
	      revert: true
	    });

		$( ".datasource-container" ).sortable({
	      revert: true
	    });

		$('.component').draggable({
		    connectToSortable: ".project-container",
		    cursor: "move",
		    helper: "clone",
		    revert: "invalid",
		    	start: function(event, ui) {	        
		        	console.debug('start draggable '+$(this));		        	
		      	},
		      	drag: function(event, ui) {
					
			    },
		    	stop: function(event, ui) {	    		
		        	console.debug('stop draggable'+$(this).html());		        	
		      	}
		});

		$('.nonvisual').draggable({
		    connectToSortable: ".datasource-container",
		    cursor: "move",
		    helper: "clone",
		    revert: "invalid",
		    	start: function(event, ui) {	        
		        	console.debug('start draggable '+$(this));		        	
		        	$('.datasource-container').addClass('datasource-container-evident', 300);
		      	},
		      	drag: function(event, ui) {
					
			    },
		    	stop: function(event, ui) {	    		
		        	console.debug('stop draggable'+$(this).html());
		        	$('.datasource-container').removeClass('datasource-container-evident', 1000);		        	
		      	}
		});

		$('.project-container').droppable({
			over : function (event, ui) {
					var $this = $(ui.draggable);
					var comp = JSON.parse($this.attr('comp'));
					comp.update = eval('('+comp.update+')');
					
					console.debug('CHAMANDO FUNCTION update() ....');
					comp.update($this, comp);

					desenhador.util.updateCompSerializable($this, comp);

					console.debug('ATUALIZANDO CONTROLLER OBJECT ....');

					desenhador.controller.makeController(event.target);					
				}
		});

		$('.datasource-container').droppable({
			over : function (event, ui) {
					var $this = $(ui.draggable);
					var comp = JSON.parse($this.attr('comp'));
					comp.update = eval('('+comp.update+')');
					
					console.debug('CHAMANDO FUNCTION update() ....');
					comp.update($this, comp);

					desenhador.util.updateCompSerializable($this, comp);

					console.debug('ATUALIZANDO CONTROLLER OBJECT ....');

					desenhador.controller.makeController(event.target);					
				}
		});

		$( "#dialog" ).dialog({
	    	  width : 500,
	    	  height : 500,
			  autoOpen: false,
			  show: {
			    effect: "explode",
			    duration: 300
			  },
			  hide: {
			    effect: "explode",
			    duration: 300
			  },
			  close: function( event, ui ) {
			  	console.debug('ATUALIZANDO CONTROLLER OBJECT ....');
				desenhador.controller.makeController();	
			  }
	    });
	};

	

	var clickOpenProperty = function () {
		$('.project-container, .datasource-container').on('dblclick', '.component', function () {
			console.debug('dblclick em componente já arrastado !!! :: '+$(this).attr('comp'));					

			if(!$(this).attr('comp')){
				console.warn('COMPONENTE CLICADO NAO TEM O ATRIBUTO (comp)');
				return;
			}

			var comp = JSON.parse($(this).attr('comp'));
			comp.update = eval('('+comp.update+')');
			comp.remove = eval('('+comp.remove+')');

			var $this = $(this);

			//POVOAR AÇÕES DE CONTROLER EM OPÇÕES DE COMPONENTES
			povoarAction(comp, desenhador.controller.getFunctions());
			desenhador.util.updateCompSerializable($this, comp);

			var montaPropriedades = new desenhador.property(comp);

			$( "#dialog" ).html('');
			$( "#dialog" ).html(montaPropriedades.getTable());

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

	var visualizar = function (html) {

		var makeController = function () {
			eval('('+desenhador.controller.makeController()+')');
		};

		$('#vFull').on('click', function () {
			console.debug('VISUALIZAR PROJETO vFull');
			makeController();
			var body = $('<div data-ng-controller="desenhadorCtrl"></div>');
			body.html(html.html()).dialog({width : $('html').width(), height : $('html').height(), title : 'Projeto'});
			angular.bootstrap(body, ['desenhador']);
		});

		$('#v240').on('click', function () {
			console.debug('VISUALIZAR PROJETO v240');
			makeController();
			var body = $('<div data-ng-controller="desenhadorCtrl"></div>');
			body.html(html.html()).dialog({width : 240, height : 420, title : 'v240'});
			angular.bootstrap(body, ['desenhador']);
		});

		$('#v320').on('click', function () {
			console.debug('VISUALIZAR PROJETO v320');
			makeController();
			var body = $('<div data-ng-controller="desenhadorCtrl"></div>');
			body.html(html.html()).dialog({width : 320, height : 420, title : 'v320'});
			angular.bootstrap(body, ['desenhador']);
		});

		$('#v480').on('click', function () {
			console.debug('VISUALIZAR PROJETO v480');
			makeController();
			var body = $('<div data-ng-controller="desenhadorCtrl"></div>');
			body.html(html.html()).dialog({width : 480, height : 570, title : 'v480'});
			angular.bootstrap(body, ['desenhador']);
		});

		$('#v768').on('click', function () {
			console.debug('VISUALIZAR PROJETO v768');
			makeController();
			var body = $('<div data-ng-controller="desenhadorCtrl"></div>');
			body.html(html.html()).dialog({width : 768, height : 570, title : 'v768'});
			angular.bootstrap(body, ['desenhador']);
		});

		$('#v1024').on('click', function () {
			console.debug('VISUALIZAR PROJETO v1024');
			makeController();
			var body = $('<div data-ng-controller="desenhadorCtrl"></div>');
			body.html(html.html()).dialog({width : 1024, height : 570, title : 'v1024'});
			angular.bootstrap(body, ['desenhador']);
		});		

		$('#limpar').on('click', function () {
			console.debug('LIMPANDO PROJETO');
			$('.project-container').html('');
		});

		$('#salvar').on('click', function () {
			console.debug('ABRINDO DIALOG PARA SALVAR PROJETO');
			openSaveDialog();
		});	

	};

	var getProjectsLocalStorage = function () {

		var projetos = [];
		
		for(var i in localStorage){
			try{
				var property = localStorage[i];
				console.debug('BUSCANDO PROPERTY EM LOCAL STORAGE '+i);
				var projeto = eval('('+localStorage[i]+')');
				if(projeto.name && projeto.content){
					projetos.push(projeto);
				}else{
					console.warn('A CHAVE ('+i+') NÃO É UM PROJETO');
				}
			}catch(e){
				console.error('ERRO NA RECUPERACAO DE PROJETOS NA CHAVE ('+i+') : '+e);
			}
		}
		console.debug('RECUPERADO(S) '+projetos.length+' PROJETOS');
		return projetos;
	};

	var povoarTabelaProjetos = function () {
		var table = $('<table class="table"></table>')
					.append('<thead></thead>')
					.append('<tbody></tbody>');

		var head = $('<tr></tr>')
					.append('<th>Nome</th>')
					.append('<th>Data</th>')
					.append('<th colspan="3">...</th>');

		table.find('thead').append(head);

		var projetos = getProjectsLocalStorage();

		var mapearEventoAbrirProjeto = function (btn, projeto) {
			btn.on('click', function () {
				console.debug('ABRINDO PROJETO ('+projeto.name+')');
				$('.project-container').html(projeto.content);
			});
		};

		var mapearEventoRemoverProjeto = function (btn, projeto) {
			btn.on('click', function () {
				console.debug('REMOVENDO PROJETO ('+projeto.name+')');
				localStorage.removeItem(projeto.name);
				$(this).parents('tr').remove();
			});
		};

		var mapearEventoVisualizarProjeto = function (btn, projeto) {
			var makeController = function () {
				eval('('+desenhador.controller.makeController()+')');
			};
			btn.on('click', function () {
				console.debug('VISUALIZANDO PROJETO ('+projeto.name+')');
				makeController();
				var body = $('<div data-ng-controller="desenhadorCtrl"></div>');
				body.html(projeto.content).dialog({width : $('html').width(), height : $('html').height(), title : 'Projeto'});
				angular.bootstrap(body, ['desenhador']);
				
			});
		};


		for(var i in projetos){

			var projeto = projetos[i];

			var btnAbrir = $('<span class="btn btn-warning glyphicon glyphicon-pencil"></span>');
			var btnRemover = $('<span class="btn btn-danger glyphicon glyphicon-trash"></span>');
			var btnVisualizar = $('<span class="btn btn-info glyphicon glyphicon-eye-open"></span>');
			
			mapearEventoAbrirProjeto(btnAbrir, projeto);
			mapearEventoRemoverProjeto(btnRemover, projeto);
			mapearEventoVisualizarProjeto(btnVisualizar, projeto);

			var tr = $('<tr></tr>')
					.append($('<td></td>').text(projeto.name))
					.append($('<td></td>').text(projeto.date))
					.append($('<td></td>').html(btnVisualizar))
					.append($('<td></td>').html(btnAbrir))
					.append($('<td></td>').html(btnRemover));
			table.find('tbody').append(tr);
		}
		return table;
		
	};

	var openSaveDialog = function () {
		var body = $('<div></div>');

		var inputGroup = $('<div class="input-group"></div>')						
						.append('<label>Nome do projeto</label>')
						.append('<div class="input-group"><input type="text" class="input-control"><span class=" btn btn-success glyphicon glyphicon-save" ></span></div>');

		inputGroup.find('span.btn').on('click', function () {
			var content = $('.project-container').html();
			var _nomeProjeto = inputGroup.find('input');
			var nomeProjeto = _nomeProjeto.val();
			if(!nomeProjeto)return;			

			console.debug('SALVANDO PROJETO ('+nomeProjeto+')');

			var projeto = {};
			projeto.name = nomeProjeto;
			projeto.content = content;
			projeto.date = new Date;
			localStorage[nomeProjeto] = JSON.stringify(projeto);

			body.find('table').remove();
			body.append(povoarTabelaProjetos());
			_nomeProjeto.val('');
		});		

		body.append(inputGroup).append('<hr/>').append(povoarTabelaProjetos());
		body.dialog({width : 768, height : 570, title : 'Salvar Projeto'});
	};

	visualizar($('.project-container'));


	var palleta = new desenhador.palleta($('#palleta'));

	pluginDraggable();
	clickOpenProperty();
});