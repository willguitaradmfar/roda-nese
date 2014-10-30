inject.define("themes.theme", [function () {
    var self = {};

    self.themes = [
        'default',
        'fluig',
        'cosmo', 
        'darkly', 
        'flatly', 
        'superhero', 
        'yeti', 
        'amelia', 
        'cyborg', 
        'facebook', 
        'united',
        'slate',
        'google-plus',
        'sandstone'];

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