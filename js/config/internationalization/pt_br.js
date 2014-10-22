inject.define("config.internationalization.pt_br", [function () {	

	var self = {};	

	self.grid = {};
	self.grid.multitxt_header = 'Etiquetas';
	self.grid.limit = 'Max. de Linhas';
	self.grid.metafieldsmulti_cols = 'Colunas';
	self.grid.metamodels_filter = 'Filtro';
	self.grid.metaarrays_list = 'Lista';
	self.grid.metacontext_context = 'Contexto';
	self.grid.metamodels_select = 'Seleciona em';
	self.grid.metaactions_init = 'Iniciar';

	self.cols = {};
	self.cols.txt_bigDesktops = 'Desktops Grandes';
	self.cols.txt_phones = 'Phones';
	self.cols.txt_tablets = 'Tables';
	self.cols.txt_desktops = 'Desktops';

	self.buttonForm = {};
	self.buttonForm.label = 'Etiqueta';
	self.buttonForm.combo_icon = 'Icone';
	self.buttonForm.combo_type = 'Tipo';
	self.buttonForm.metaactions_actionClick = 'Ação';	

	self.protheusSoap = {};
	self.protheusSoap.nameService = 'Nome';
	self.protheusSoap.urlWS = 'URL WS Protheus';
	self.protheusSoap.method = 'Metodo';
	self.protheusSoap.tagResult = 'Tag Resultado';
	self.protheusSoap.model = 'Modelo';
	self.protheusSoap.table = 'Tabela';
	self.protheusSoap.metacontext_context = 'Contexto';
	
	self.chartLine = {};
	self.chartLine.metacontext_context = 'Contexto';
	self.chartLine.maxPoint = 'Maximo de pontos';
	self.chartLine.metafields_labelField = 'Legenda';
	self.chartLine.metafields_valueField = 'Valor';
	self.chartLine.metaarrays_list = 'Lista';
	self.chartLine.metaactions_init = 'Iniciar';

	self.chartBar = {};
	self.chartBar.metacontext_context = 'Contexto';
	self.chartBar.maxPoint = 'Maximo de pontos';
	self.chartBar.metafields_labelField = 'Legenda';
	self.chartBar.metafields_valueField = 'Valor';
	self.chartBar.metaarrays_list = 'Lista';
	self.chartBar.metaactions_init = 'Iniciar';

	self.chartPie = {};
	self.chartPie.metacontext_context = 'Contexto';
	self.chartPie.metafields_labelField = 'Legenda';
	self.chartPie.metafields_valueField = 'Valor';
	self.chartPie.metafields_colorField = 'Cor';
	self.chartPie.metaarrays_list = 'Lista';
	self.chartPie.metaactions_init = 'Iniciar';

	self.chartPolarArea = {};
	self.chartPolarArea.metacontext_context = 'Contexto';
	self.chartPolarArea.metafields_labelField = 'Legenda';
	self.chartPolarArea.metafields_valueField = 'Valor';
	self.chartPolarArea.metafields_colorField = 'Cor';
	self.chartPolarArea.metaarrays_list = 'Lista';
	self.chartPolarArea.metaactions_init = 'Iniciar';

	self.chartRadar = {};
	self.chartRadar.metacontext_context = 'Contexto';
	self.chartRadar.maxPoint = 'Maximo de pontos';
	self.chartRadar.metafields_labelField = 'Legenda';
	self.chartRadar.metafields_valueField = 'Valor';
	self.chartRadar.metaarrays_list = 'Lista';
	self.chartRadar.metaactions_init = 'Iniciar';
	
	return self;
}]);