inject.define("utils.xmlJSON", [function () {
    var self = {};
    self.xmlToJSON = function (xml) {
		var x2js = new X2JS();
		if(!xml) throw 'NÃO FOI PASSADO O XML';
		var obj = x2js.xml_str2json(xml);
		return obj;
	};
	

	self.JSONToXml = function (json) {
		var x2js = new X2JS();
		if(!json) throw 'NÃO FOI PASSADO O XML';
		var xml = x2js.json2xml_str(json);
		return xml;
	};
    return self;
}]);