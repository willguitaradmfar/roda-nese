inject.define("projects.projectFileStorage", ["utils.util", "utils.dao.component", "utils.file", function (util, dao, file) {

	var self = {};

	var openSaveDialog = function () {

		var body = $('<div></div>');

		var inputGroup = $('<div class="input-group"></div>')
						.append('<label>Nome do projeto</label>')
						.append('<div class="input-group"><input type="text" class="input-control"><span class=" btn btn-success glyphicon glyphicon-save" ></span></div>');

		inputGroup.find('span.btn').on('click', function () {
			var content = $('.des-container').html();
			var contentDatasource = $('.des-datasource').html();
			var _nomeProjeto = inputGroup.find('input');
			var nomeProjeto = _nomeProjeto.val();
			if(!nomeProjeto)return;

			console.debug('SALVANDO PROJETO ('+nomeProjeto+')');

			var projeto = {};
			projeto.name = nomeProjeto;
			projeto.content = content;
			projeto.contentDatasource = contentDatasource;
			projeto.db = dao.bkpDB();
			projeto.date = new Date;
			file.save(projeto);
			_nomeProjeto.val('');
		});

		body.append(inputGroup);
		body.dialog({width : 768, height : 570, title : 'Salvar Projeto'});
	};

	self.projects = function () {
		$('#limpar').on('click', function () {
			console.debug('LIMPANDO PROJETO');
			$('.des-container').html('');
			$('.des-datasource').html('');			
		});

		$('#salvarFile').on('click', function () {
			console.debug('ABRINDO DIALOG PARA SALVAR PROJETO');
			openSaveDialog();
		});
	};

	return self;
}]);