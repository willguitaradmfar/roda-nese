inject.define("exports.generator", [
		"utils.http",
	function (http) {
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

		self.makeFileToZip = function (importsCopy, files) {			

			for(var i in importsCopy){
				var path = importsCopy[i];
				var c = http.getContentfile(path);
				var fileJS = {};

				var regex = /^(.*)\/(.*)$/;

				fileJS.name = path.replace(regex, "$2");
				fileJS.content = c;
				fileJS.folder = path.replace(regex, "$1");					

				files.push(fileJS);
			}
		}	

		self.makeHead = function (config) {
				if(!config) throw 'config não passado em makeHead';

				config.title = config.title || 'Título';
				config.dependencyJS = config.dependencyJS || [];
				config.dependencyCSS = config.dependencyCSS || [];
				config.dependencyJSGenerator = config.dependencyJSGenerator || [];							

				var dependencysJS = self.makeDependencyJS(config.dependencyJS);				
				var dependencysJSGenerator = self.makeDependencyJS(config.dependencyJSGenerator);
				var dependencysCSS = self.makeDependencyCSS(config.dependencyCSS);

				var head = $('<head></head>');

				var content = $('<div></div>');
				for(var i in dependencysCSS){
					var dependency = dependencysCSS[i];					
					content.append(dependency);
				}
				for(var i in dependencysJS){
					var dependency = dependencysJS[i];					
					content.append(dependency);
				}

				content.append($('<title></title>').text(config.title + ' Tema '+config.theme));				
				content.append($('<meta charset="UTF-8">'));
				content.append($('<meta name="viewport" content="width=device-width, initial-scale=1.0">'));
				content.append($('<link rel="shortcut icon" href="image/fav/liferay.ico" type="image/vnd.microsoft.icon" />'));				
				head.append(content.html());

				return head;
		};

	    return self;
	}]);