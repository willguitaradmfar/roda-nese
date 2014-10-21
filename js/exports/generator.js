inject.define("exports.generator", [function () {
    var self = {};

    self.makeDependencyJS = function (dependencys) {
		var _dependencys = [];
		for(var i in dependencys){
			var dependency = dependencys[i];
			var script = $('<script></script>');
			script.attr('src', dependency);
			script.attr('type', 'text/javascript');
			_dependencys.push(script);
		}			
		return _dependencys;
	};

	self.makeDependencyCSS = function (dependencys) {
		var _dependencys = [];
		for(var i in dependencys){
			var dependency = dependencys[i];
			var script = $('<link rel="stylesheet" href="'+dependency+'">');				
			_dependencys.push(script);
		}			
		return _dependencys;
	};

	self.makeHead = function (config) {
			if(!config) throw 'config não passado em makeHead';

			config.title = config.title || 'Título';
			config.dependencyJS = config.dependencyJS || [];
			config.dependencyCSS = config.dependencyCSS || [];			

			var dependencysJS = self.makeDependencyJS(config.dependencyJS);				
			var dependencysCSS = self.makeDependencyCSS(config.dependencyCSS);

			var head = $('<head></head>');

			var content = $('<div></div>');
			for(var i in dependencysCSS){
				var dependency = dependencysCSS[i];
				console.debug('ADICIONANDO DEPENDENCIA CSS '+$(dependency).attr('href'));
				content.append(dependency);
			}
			for(var i in dependencysJS){
				var dependency = dependencysJS[i];
				console.debug('ADICIONANDO DEPENDENCIA JS '+$(dependency).attr('src'));
				content.append(dependency);
			}				
			content.append($('<title></title>').text(config.title));
			content.append($('<meta name="viewport" content="width=device-width, initial-scale=1.0">'));
			head.append(content.html());

			return head;
	};

    return self;
}]);