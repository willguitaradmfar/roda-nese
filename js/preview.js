var desenhador = desenhador || {};

(function(desenhador) {
	desenhador.preview = desenhador.preview || {};


	desenhador.preview = function (html) {

		var makeController = function () {
			desenhador.util.eval(desenhador.controller.makeController());
		};

		var makeControllerPopupScript = function () {
			var script = $('<script></script>');
			script.html(desenhador.controller.makeController());
			return script;
		};

		$('#popup').on('click', function () {
			console.debug('VISUALIZAR PROJETO popup');
			var script = makeControllerPopupScript();
			script.append("angular.bootstrap(body, ['desenhador']);");

			var popup = open('', 'Projeto', 'width=700,height=700');

			popup.document.head.innerHTML = script.html();

			//TODO NÃO ESTA APLICANDO O CONTROLLER ANGULAR
			var body = $('<div></div>');
			body.append('<div data-ng-controller="desenhadorCtrl"></div>');
			body.html(html.html());
			
			popup.document.body.innerHTML = body.html();
		});

		$('#vFull').on('click', function () {
			console.debug('VISUALIZAR PROJETO vFull');
			makeController();
			var body = $('<div data-ng-controller="desenhadorCtrl"></div>');
			body.html(html.html()).dialog({width : $('html').width(), height : $('html').height(), title : 'Projeto'});
			angular.bootstrap(body, ['desenhador']);

		});

		$('#v240').on('click', function () {
			console.debug('VISUALIZAR PROJETO v240');
			makeController();
			var body = $('<div data-ng-controller="desenhadorCtrl"></div>');
			body.html(html.html()).dialog({width : 240, height : 420, title : 'v240'});
			angular.bootstrap(body, ['desenhador']);

		});

		$('#v320').on('click', function () {
			console.debug('VISUALIZAR PROJETO v320');
			makeController();
			var body = $('<div data-ng-controller="desenhadorCtrl"></div>');
			body.html(html.html()).dialog({width : 320, height : 420, title : 'v320'});
			angular.bootstrap(body, ['desenhador']);

		});

		$('#v480').on('click', function () {
			console.debug('VISUALIZAR PROJETO v480');
			makeController();
			var body = $('<div data-ng-controller="desenhadorCtrl"></div>');
			body.html(html.html()).dialog({width : 480, height : 570, title : 'v480'});
			angular.bootstrap(body, ['desenhador']);

		});

		$('#v768').on('click', function () {
			console.debug('VISUALIZAR PROJETO v768');
			makeController();
			var body = $('<div data-ng-controller="desenhadorCtrl"></div>');
			body.html(html.html()).dialog({width : 768, height : 570, title : 'v768'});
			angular.bootstrap(body, ['desenhador']);

		});

		$('#v1024').on('click', function () {
			console.debug('VISUALIZAR PROJETO v1024');
			makeController();
			var body = $('<div data-ng-controller="desenhadorCtrl"></div>');
			body.html(html.html()).dialog({width : 1024, height : 570, title : 'v1024'});
			angular.bootstrap(body, ['desenhador']);

		});
	};
})(desenhador);