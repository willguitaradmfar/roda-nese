inject.define("utils.file", ["utils.util", function (util) {
    var self = {};
     	
    self.save = function (obj) {
    	var strSave = util.stringify(obj);    	
    	window.open('data:text/csv;charset=utf-8,' + (strSave));
    }

    self.openText = function (fileReader, cb) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var contents = e.target.result;
            cb(contents);
        };
        reader.readAsText(fileReader);
    }

    self.openObj = function (fileReader, cb) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var contents = e.target.result;
            cb(util.eval(contents));
        };
        reader.readAsText(fileReader);
    }

    return self;
}]);