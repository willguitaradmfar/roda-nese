inject.define("exports.previewer", [
		"builds.service", 
		"builds.controller",
		"builds.directive",
		"utils.zip",
		"exports.generator",
	function (service, controller, directive, zip, generator) {

		var self = {};

		self.preview = function (html) {

			var self = this;					

			self.openPopup = function (config) {

				if(!config) throw 'config não passado';

				var title = config.title || 'Titulo do Projeto';
				var ctrlName = config.ctrl || 'desenhadorCtrl';
				var appName = config.appName || 'desenhador';
				var width = config.width || 1024;
				var height = config.height || 768;
				var makeController = config.makeController || controller.makeController;
				var makeService = config.makeService || service.makeService;
				var makeDirective = config.makeDirective || directive.makeDirective;
				
				console.debug('VISUALIZAR PROJETO '+title);				

				var script = $('<script type="text/javascript"></script>');
				script.append('\nvar angularApp = angular.module(\'desenhador\', []);');
				script.append(makeDirective());
				script.append(makeService());
				script.append(makeController());		

				config.dependencyJS = [
					'dependencyRuntime/jquery/jquery-ui-1.11.1/external/jquery/jquery.js',
					'dependencyRuntime/angular.min.js',
					'dependencyRuntime/bootstrap.min.js',					
					'dependencyRuntime/ChartJS/Chart.js',
					'dependencyRuntime/soapjs/soapclient.js'				
				];

				config.dependencyCSS = [
					'dependencyRuntime/bootstrap.min.css',
					'dependencyRuntime/bootstrap-theme.min.css'
				];

				var head = generator.makeHead(config);

				head.append(script);

				var popup = open('', '_blank', 'width='+width+',height='+height);			
				
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
				popup.document.open();
				popup.document.write('<html>'+_temp.html()+'</html>');
				popup.document.close();
			};

			$('#vFull').on('click', function () {
				self.openPopup({
					width : $('html').width(), 
					height : $('html').height(),
					title : 'Projeto vFull'
				});
			});

			$('#v240').on('click', function () {
				self.openPopup({
					width : 240, 
					height : 420,
					title : 'Projeto v240'
				});
			});

			$('#v320').on('click', function () {
				self.openPopup({
					width : 320, 
					height : 420,
					title : 'Projeto v320'
				});			
			});

			$('#v480').on('click', function () {
				self.openPopup({
					width : 480, 
					height : 570,
					title : 'Projeto v480'
				});			
			});

			$('#v768').on('click', function () {
				self.openPopup({
					width : 768, 
					height : 570,
					title : 'Projeto v768'
				});
			});

			$('#v1024').on('click', function () {
				self.openPopup({
					width : 1024, 
					height : 570,
					title : 'Projeto v1024'
				});				
			});
		}

		return self;
	}]);