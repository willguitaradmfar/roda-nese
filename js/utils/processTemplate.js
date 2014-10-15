inject.define("utils.processTemplate", [function () {
    var self = {};
    self.processTemplate = function (keys, values, template) {
		if(!template) throw 'Template indefinido';		
		var result = template.toString();
		for(var i in keys){
			var key = keys[i];
			var regex = new RegExp('\\$'+key+'\\$', "ig");
			result = result.replace(regex, values[i]);
		}
		return result;
	};

	self.processTemplateParam = function (template, parameters) {
		if(!template) throw 'Template indefinido';
		var _tmp = template.toString();

		for(var i in parameters){
			var param = parameters[i];
			var regex = new RegExp('\\$'+i+'\\$', "ig");
			_tmp = _tmp.replace(regex, param);
		}
		return _tmp;
	};
    return self;
}]);