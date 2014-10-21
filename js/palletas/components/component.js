inject.define("palletas.components.component", [
		"palletas.components.alertMessage",
		"palletas.components.buttonForm",
		"palletas.components.chartLine",
		"palletas.components.chartPie",
		"palletas.components.grid",
		"palletas.components.h1",
		"palletas.components.h2",
		"palletas.components.h3",
		"palletas.components.h4",
		"palletas.components.h5",
		"palletas.components.h6",
		"palletas.components.icon",
		"palletas.components.image",
		"palletas.components.inputForm",
		"palletas.components.label",
		"palletas.components.progress",
		"palletas.components.selectForm",
		"palletas.components.separatorForm",
		"palletas.components.textareaForm",
		"palletas.components.chartBar",
		"palletas.components.chartRadar",
		"palletas.components.chartPolarArea",
		"palletas.components.inputDateForm",
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
				inputDateForm) {
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
		self.inputDateForm = inputDateForm;
	    return self;
	}]);