inject.define("exports.exportZip", [
		"utils.zip",
		"builds.service", 
		"builds.controller",
		"builds.directive",
		"exports.generator",
	function (zip, service, controller, directive, generator) {
	    var self = {};
	   
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

			var fileAppJS = {};
			fileAppJS.name = 'app.js';
			fileAppJS.content = '\nvar angularApp = angular.module(\'desenhador\', []);';
			fileAppJS.folder = 'js';
			files.push(fileAppJS);

			var fileDirectiveJS = {};
			fileDirectiveJS.name = 'directive.js';
			fileDirectiveJS.content = makeDirective();
			fileDirectiveJS.folder = 'js/directives';
			files.push(fileDirectiveJS);

			var fileServiceJS = {};
			fileServiceJS.name = 'service.js';
			fileServiceJS.content = makeService();
			fileServiceJS.folder = 'js/services';
			files.push(fileServiceJS);

			var fileControllerJS = {};
			fileControllerJS.name = 'controller.js';
			fileControllerJS.content = makeController();
			fileControllerJS.folder = 'js/controllers';
			files.push(fileControllerJS);			

			config.dependencyJS = [
				'dependencyRuntime/jquery/jquery-ui-1.11.1/external/jquery/jquery.js',
				'dependencyRuntime/angular.min.js',
				'dependencyRuntime/bootstrap.min.js',					
				'dependencyRuntime/ChartJS/Chart.js',
				'dependencyRuntime/soapjs/soapclient.js',
				'js/app.js',
				'js/directives/directive.js',
				'js/services/service.js',
				'js/controllers/controller.js'				
			];

			config.dependencyCSS = [
				'dependencyRuntime/bootstrap.min.css',
				'dependencyRuntime/bootstrap-theme.min.css'
			];
				
			var head = generator.makeHead(config);
				
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
					title : 'DESENHADOR'
				})
			});		
		};		

	    return self;
	}]);