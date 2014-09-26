var desenhador = desenhador || {};

(function(desenhador) {
	desenhador.projects = desenhador.projects || {};

	var getProjectsLocalStorage = function () {

		var projetos = [];

		for(var i in localStorage){
			try{
				var property = localStorage[i];
				console.debug('BUSCANDO PROPERTY EM LOCAL STORAGE '+i);
				var projeto = desenhador.util.eval(localStorage[i]);
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
				$('.datasource-container').html(projeto.contentDatasource);

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

			var _datasourceTmp = $('<div></div>');			
			_datasourceTmp.append(projeto.contentDatasource);

			var contentTmp = $('<div></div>');			
			contentTmp.append(projeto.content);		

			btn.on('click', function () {				
				var preview = desenhador.preview(contentTmp.html());
				preview.openPopup({
					width : 480, 
					height : 570,
					title : 'Projeto v480',
					makeController : function () {
						return desenhador.controller.makeController(_datasourceTmp);
					}
				});
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
			var contentDatasource = $('.datasource-container').html();
			var _nomeProjeto = inputGroup.find('input');
			var nomeProjeto = _nomeProjeto.val();
			if(!nomeProjeto)return;

			console.debug('SALVANDO PROJETO ('+nomeProjeto+')');

			var projeto = {};
			projeto.name = nomeProjeto;
			projeto.content = content;
			projeto.contentDatasource = contentDatasource;
			projeto.date = new Date;
			localStorage[nomeProjeto] = JSON.stringify(projeto);

			body.find('table').remove();
			body.append(povoarTabelaProjetos());
			_nomeProjeto.val('');
		});

		body.append(inputGroup).append('<hr/>').append(povoarTabelaProjetos());
		body.dialog({width : 768, height : 570, title : 'Salvar Projeto'});
	};

	desenhador.projects = function () {
		$('#limpar').on('click', function () {
			console.debug('LIMPANDO PROJETO');
			$('.project-container').html('');
		});

		$('#salvar').on('click', function () {
			console.debug('ABRINDO DIALOG PARA SALVAR PROJETO');
			openSaveDialog();
		});
	};

})(desenhador);