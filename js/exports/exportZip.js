inject.define("exports.exportZip", [
		"utils.zip",
		"builds.service", 
		"builds.controller",
		"builds.directive",
	function (zip, service, controller, directive) {
	    var self = {};

	    var makeDependencyJS = function (dependencys) {
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

		var makeDependencyCSS = function (dependencys) {
			var _dependencys = [];
			for(var i in dependencys){
				var dependency = dependencys[i];
				var script = $('<link rel="stylesheet" href="'+dependency+'">');				
				_dependencys.push(script);
			}			
			return _dependencys;
		};

	    self.exportExecutable = function (config) {
			if(!config) throw 'config não passado';

			var files = [];

			var title = config.title || 'Titulo do Projeto';
			var ctrlName = config.ctrl || 'desenhadorCtrl';
			var appName = config.appName || 'desenhador';

			var makeController = config.makeController || controller.makeController;
			var makeService = config.makeService || service.makeService;
			var makeDirective = config.makeDirective || directive.makeDirective;
			
			console.debug('EXPORTAR PROJETO '+title + ' PARA ZIP');

			var head = $('<head></head>');

			var fileAppJS = {};
			fileAppJS.name = 'app.js';
			fileAppJS.content = '\nvar angularApp = angular.module(\'desenhador\', []);';				
			fileAppJS.content += makeDirective();
			fileAppJS.content += makeService();
			fileAppJS.content += makeController();
			files.push(fileAppJS);

			var dependencyJS = [
				'dependencyRuntime/jquery/jquery-ui-1.11.1/external/jquery/jquery.js',
				'dependencyRuntime/angular.min.js',
				'dependencyRuntime/bootstrap.min.js',					
				'dependencyRuntime/ChartJS/Chart.js',
				'dependencyRuntime/soapjs/soapclient.js',
				'app.js'
			];

			var dependencyCSS = [
				'dependencyRuntime/bootstrap.min.css',
				'dependencyRuntime/bootstrap-theme.min.css'
			];

			var dependencysJS = makeDependencyJS(dependencyJS);				
			var dependencysCSS = makeDependencyCSS(dependencyCSS);			

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
			content.append($('<title></title>').text(title));
			head.append(content.html());						
			
			var body = $('<body></body>');
			var ctrl = $('<div data-ng-controller="'+ctrlName+'"></div>');
			
			if(!html)throw 'Conteudo HTML não passado';
			if(!html.html)html=$(html);			

			ctrl.append(html.html());
			body.attr('data-ng-app', appName);

			body.append(ctrl);			
			var _temp = $('<div></div>');						
			_temp.append(head);
			_temp.append(body);

			var fileHTML = {};
			fileHTML.name = 'index.html';
			fileHTML.content = '<html>'+_temp.html()+'</html>';				
			files.push(fileHTML);


			zip.createZip(files);
		};

		self.register = function (target) {
			html = target;
			$('#export').on('click', function () {
				self.exportExecutable({
					width : 1024, 
					height : 570,
					title : 'ZIP'
				})
			});		
		};		

	    return self;
	}]);