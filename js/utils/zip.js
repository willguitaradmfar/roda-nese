inject.define("utils.zip", [function () {
    var self = {};
    self.createZip = function(arrayFile) {
	    var zip = new JSZip();
	    for(var i in arrayFile){
	    	var file = arrayFile[i];
	    	zip.add(file.name, file.content);	
	    }
	    content = zip.generate();
	    location.href="data:application/zip;base64," + content;
	}
    return self;
}]);