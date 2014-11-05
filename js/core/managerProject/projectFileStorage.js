inject.define("core.managerProject.projectFileStorage", [
		"core.utils.util", 
		"core.utils.dao.compDB", 
		"core.utils.file", 
		"core.dragdrops.dragdrop",
	function (util, dao, file, dragdrop) {

		var self = {};

		var openSaveDialog = function () {

			var body = $('<div></div>');

			var separator = $('<hr/>');

			var inputGroupSave = $('<div class="input-group"></div>');
			var labelSave = $('<label>Nome do projeto</label>');
			var inputSave = $('<div class="input-group"><input type="text" class="input-control"> | </div>');
			var buttonSave = $('<span class=" btn btn-success glyphicon glyphicon-save"> Salvar</span>');

			var inputGroupOpen = $('<div class="input-group" ></div>');		
			var buttonOpen = $('<span class="btn btn-success btn-file glyphicon glyphicon-open"> Abrir<input type="file"></span>');

			inputSave.append(buttonSave);

			inputGroupSave
				.append(labelSave)
				.append(inputSave);

			inputGroupOpen.append(buttonOpen);

			inputGroupOpen.find(':file').on('change', function () {
				var input = $(this);
				if(!input || !input.get(0) || !input.get(0).files || !input.get(0).files.length || input.get(0).files.length == 0) return;			

				for(var i = 0, lengthFile = input.get(0).files.length ; i < lengthFile ; i++){
					var fileReader = input.get(0).files[i];
					file.openObj(fileReader, function (obj) {
						$('.des-container').html(obj.content);
						$('.des-datasource').html(obj.contentDatasource);
						dao.restoreBkpDB(obj.db);
						dragdrop.dragdrop();
					});
				}			
			});

			inputGroupSave.find('span.btn').on('click', function () {
				var content = $('.des-container').html();
				var contentDatasource = $('.des-datasource').html();
				var _nomeProjeto = inputGroupSave.find('input');
				var nomeProjeto = _nomeProjeto.val();
				if(!nomeProjeto)return;

				console.debug('SALVANDO PROJETO ('+nomeProjeto+')');

				var projeto = {};
				projeto.name = nomeProjeto;
				projeto.content = content;
				projeto.contentDatasource = contentDatasource;
				projeto.db = dao.bkpDB();
				projeto.date = new Date;

				var extensao = '.des';

				file.save(projeto, nomeProjeto+extensao);
				_nomeProjeto.val('');
			});

			body.append(inputGroupSave);
			body.append(separator);
			body.append(inputGroupOpen);
			body.dialog({width : 400, height : 200, title : 'Salvar Projeto'});
		};

		self.projects = function () {
			$('#salvarFile').on('click', function () {
				console.debug('ABRINDO DIALOG PARA SALVAR PROJETO');
				openSaveDialog();
			});
		};

		return self;
	}]);