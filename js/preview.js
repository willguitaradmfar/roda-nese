var desenhador = desenhador || {};

(function(desenhador) {
	desenhador.preview = desenhador.preview || {};


	desenhador.preview = function (html) {

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
			var makeController = config.makeController || desenhador.controller.makeController;
			
			console.debug('VISUALIZAR PROJETO '+title);

			var head = $('<head></head>');

			var script = $('<script type="text/javascript"></script>');
			script.append(makeController());

			var dependencysJS = makeDependencyJS([
				'dependency/jquery/jquery-ui-1.11.1/external/jquery/jquery.js',
				'dependency/angular.min.js',
				'dependency/bootstrap.min.js',
				'dependency/nvd3/d3.v3.min.js',
				'dependency/nvd3/nv.d3.js',
				'dependency/nvd3/ng-nvd3.js'
			]);
			
			var dependencysCSS = makeDependencyCSS([
				'dependency/bootstrap.min.css',
				'dependency/bootstrap-theme.min.css'
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

			//desenhador.util.removeAttrComp(html);

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

		return {
			'openPopup' : self.openPopup
		}
	};
})(desenhador);