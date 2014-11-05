inject.define("core.utils.file", ["core.utils.util", function (util) {
    var self = {};
     	
    self.save = function (obj, name) {
    	var strSave = util.stringify(obj);

        var a = document.createElement('a');
        a.textContent = 'download';
        a.download = name;
        a.href = 'data:text/csv;charset=utf-8,'+escape(strSave);
        a.click();
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