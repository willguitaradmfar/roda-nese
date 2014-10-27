inject.define("themes.theme", [function () {
    var self = {};

    self.themes = ['default', 'cosmo', 'darkly', 'flatly', 'superhero', 'yeti'];

    var theme = $('#theme');
    
    for(var i in self.themes){
    	var _theme = self.themes[i];
    	var option = $('<option></option>');
    	option.attr('value', _theme);
    	option.text(_theme);
    	theme.append(option);
    }    

    return self;
}]);