(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.config = global.desenhador.config || {};
	global.desenhador.config.internationalization = global.desenhador.config.internationalization || {};
	global.desenhador.config.internationalization.pt_br = global.desenhador.config.internationalizationpt_br || {};
	var self = global.desenhador.config.internationalization.pt_br;

	self.grid = {};
	self.grid.tags_header = 'Colunas';
	self.grid.limit = 'Max. de Linhas';
	self.grid.mult_cols = 'Bind Colunas';
	self.grid.filter = 'Filtro';
	self.grid.list = 'Lista';
	self.grid.context = 'Contexto';
	self.grid.select = 'Seleciona em';

	self.cols = {};
	self.cols.bigDesktops = 'Desktops Grandes';
	self.cols.phones = 'Phones';
	self.cols.tablets = 'Tables';
	self.cols.desktops = 'Desktops';

	self.buttonForm = {};
	self.buttonForm.label = 'Etiqueta';
	self.buttonForm.icon = 'Icone';
	self.buttonForm.type = 'Tipo';
	self.buttonForm.actionClick = 'Acao';
	self.buttonForm.context = 'Contexto';

})(window)