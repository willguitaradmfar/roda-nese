inject.define("config.internationalization.translate", [function () {

	var pt_br = {};

	var self = {};
	self.pt_br = pt_br;

	pt_br.grid = {};
	pt_br.grid.tags_header = 'Colunas';
	pt_br.grid.limit = 'Max. de Linhas';
	pt_br.grid.mult_cols = 'Bind Colunas';
	pt_br.grid.filter = 'Filtro';
	pt_br.grid.list = 'Lista';
	pt_br.grid.context = 'Contexto';
	pt_br.grid.select = 'Seleciona em';

	pt_br.cols = {};
	pt_br.cols.txt_bigDesktops = 'Desktops Grandes';
	pt_br.cols.txt_phones = 'Phones';
	pt_br.cols.txt_tablets = 'Tables';
	pt_br.cols.txt_desktops = 'Desktops';

	pt_br.buttonForm = {};
	pt_br.buttonForm.label = 'Etiqueta';
	pt_br.buttonForm.icon = 'Icone';
	pt_br.buttonForm.type = 'Tipo';
	pt_br.buttonForm.actionClick = 'Acao';	

	pt_br.protheusSoap = {};
	pt_br.protheusSoap.nameService = 'Nome';
	pt_br.protheusSoap.urlWS = 'URL WS Protheus';
	pt_br.protheusSoap.method = 'Metodo';
	pt_br.protheusSoap.tagResult = 'Tag Resultado';
	pt_br.protheusSoap.model = 'Modelo';
	pt_br.protheusSoap.table = 'Tabela';
	pt_br.protheusSoap.context = 'Contexto';
	
	return self;
}]);