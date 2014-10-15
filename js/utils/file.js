inject.define("utils.file", ["utils.util", function (util) {
    var self = {};
     	
    self.save = function (obj) {
    	var strSave = util.stringify(obj);    	
    	window.open('data:text/csv;charset=utf-8,' + (strSave));
    }

    self.open = function (obj) {
    	   	

    }
    return self;
}]);