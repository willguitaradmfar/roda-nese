inject.define("previewers.previewer", ["builds.service", "builds.controller", function (service, controller) {

	var self = {};

	self.preview = function (html) {

		var self = this;	

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

		self.openPopup = function (config) {

			if(!config) throw 'config não passado';

			var title = config.title || 'Titulo do Projeto';
			var ctrlName = config.ctrl || 'desenhadorCtrl';
			var appName = config.appName || 'desenhador';
			var width = config.width || 1024;
			var height = config.height || 768;
			var makeController = config.makeController || controller.makeController;
			var makeService = config.makeService || service.makeService;
			
			console.debug('VISUALIZAR PROJETO '+title);

			var head = $('<head></head>');

			var script = $('<script type="text/javascript"></script>');
			script.append('\nvar angularApp = angular.module(\'desenhador\', [\'ng-nvd3\']);');
			script.append(makeService());
			script.append(makeController());		

			var dependencysJS = makeDependencyJS([
				'dependencyRuntime/jquery/jquery-ui-1.11.1/external/jquery/jquery.js',
				'dependencyRuntime/angular.min.js',
				'dependencyRuntime/bootstrap.min.js',
				'dependencyRuntime/nvd3/d3.v3.min.js',
				'dependencyRuntime/nvd3/nv.d3.js',
				'dependencyRuntime/nvd3/ng-nvd3.js',
				'dependencyRuntime/soapjs/soapclient.js'
			]);
			
			var dependencysCSS = makeDependencyCSS([
				'dependencyRuntime/bootstrap.min.css',
				'dependencyRuntime/bootstrap-theme.min.css'
			]);			

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
			content.append(script);
			content.append($('<title></title>').text(title));
			head.append(content.html());

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