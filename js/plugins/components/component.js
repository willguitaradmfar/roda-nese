inject.define("plugins.components.component", [
		"plugins.components.alertMessage.alertMessage",
		"plugins.components.buttonForm.buttonForm",
		"plugins.components.chartLine.chartLine",
		"plugins.components.chartPie.chartPie",
		"plugins.components.grid.grid",
		"plugins.components.h1.h1",
		"plugins.components.h2.h2",
		"plugins.components.h3.h3",
		"plugins.components.h4.h4",
		"plugins.components.h5.h5",
		"plugins.components.h6.h6",
		"plugins.components.icon.icon",
		"plugins.components.image.image",
		"plugins.components.inputForm.inputForm",
		"plugins.components.label.label",
		"plugins.components.progress.progress",
		"plugins.components.selectForm.selectForm",
		"plugins.components.separatorForm.separatorForm",
		"plugins.components.textareaForm.textareaForm",
		"plugins.components.chartBar.chartBar",
		"plugins.components.chartRadar.chartRadar",
		"plugins.components.chartPolarArea.chartPolarArea",
		"plugins.components.brand.brand",
	function (	
				alertMessage, 
				buttonForm, 
				chartLine, 
				chartPie, 
				grid, 
				h1, 
				h2, 
				h3, 
				h4, 
				h5, 
				h6, 
				icon, 
				image, 
				inputForm, 
				label, 
				progress, 
				selectForm, 
				separatorForm, 
				textareaForm,
				chartBar,
				chartRadar,
				chartPolarArea,
				brand) {
	    var self = {};	    
	    self.alertMessage = alertMessage;
		self.buttonForm = buttonForm;
		self.chartLine = chartLine;
		self.chartPie = chartPie;
		self.grid = grid;
		self.h1 = h1;
		self.h2 = h2;
		self.h3 = h3;
		self.h4 = h4;
		self.h5 = h5;
		self.h6 = h6;
		self.icon = icon;
		self.image = image;
		self.inputForm = inputForm;
		self.label = label;
		self.progress = progress;
		self.selectForm = selectForm;
		self.separatorForm = separatorForm;
		self.textareaForm = textareaForm;
		self.chartBar = chartBar;
		self.chartRadar = chartRadar;
		self.chartPolarArea = chartPolarArea;
		self.brand = brand;
	    return self;
	}]);