inject.define("core.exports.handExport", [
		"core.builds.filter",
		"core.builds.service", 
		"core.builds.controller",
		"core.builds.directive",
		"core.utils.dao.compDB",
		"plugins.exports.exports", 
	function (filter, service, controller, directive, dao, exports){
	    var self = {};

	    self.init = function () {
	    	
	    	for(var  i in exports){
	    		var _export = exports[i];
	    		var _exportName = _export.name || i;
	    		var _exportCategory = _export.category;
	    		var _exportIcon = _export.icon || 'list';
	    		_export.config(self);

	    		var opcao = $('<li><a class="glyphicon glyphicon-'+_exportIcon+'" href="#"> '+_exportName+'</a></li>');
	    		$('#'+_exportCategory).append(opcao);
	    		$(opcao).on('click', _export.exec);
	    	}
	    };	  
	    
	    self.getBody = function (config) {
	    	config = config || {};
	    	var ngController = config.ngController || 'desenhadorCtrl';
	    	var ngApp = config.ngApp || 'desenhador';

	    	var project = $('#project[data-body-project]').clone();

	    	clearComponents(project);

	    	var ctrl = $('<div data-ng-controller="'+ngController+'"></div>');
	    	ctrl.append(project.html());

	    	var body = $('<body></body>');
	    	body.attr('data-ng-app', ngApp);
	    	body.append(ctrl);

	    	return body;
	    };

	    self.getTheme = function (config) {
	    	config = config || {};
	    	var theme = $('#theme').val();
	    	return theme;
	    }

	    self.getHead = function (config) {
	    	config = config || {};
	    	var dependencysCSS = config.dependencysCSS || [];
	    	var dependencysJS = config.dependencysJS || [];
	    	config.title = config.title || 'Título';

	    	var head = $('<head></head>');
	    	var content = $('<div></div>');

	    	content.append($('<title></title>').text(config.title + ' Tema '+config.theme));
			content.append($('<meta charset="UTF-8">'));
			content.append($('<meta name="viewport" content="width=device-width, initial-scale=1.0">'));
			content.append($('<link rel="shortcut icon" href="image/fav/liferay.ico" type="image/vnd.microsoft.icon" />'));

			for(var i in dependencysCSS){
				var dependency = dependencysCSS[i];					
				content.append($('<link rel="stylesheet" href="'+dependency+'">'));
			}
			for(var i in dependencysJS){
				var dependency = dependencysJS[i];				
				content.append($('<script src="'+dependency+'" type="text/javascript"></script>'));
			}

			head.append(content.html());
			return head;
	    };

	    self.getFilters = function (config) {
	    	config = config || {};
	    	return filter.makeFilter();
	    };

	    self.getControllers = function (config) {
	    	config = config || {};
	    	return controller.makeController();
	    };

	    self.getServices = function (config) {
	    	config = config || {};
	    	return service.makeService();
	    };

	    self.getDirectives = function (config) {
	    	config = config || {};
	    	return directive.makeDirective();
	    };

	    self.getMainModule = function (config) {
	    	config = config || {};
	    	var ngApp = config.ngApp || 'desenhador';
	    	var script = 'var angularApp = angular.module(\''+ngApp+'\', []);';
	    	return script;
	    };

	    var clearComponents = function (config) {
	    	config = config || {};
	    	var content = config.content || $('<div></div>');

	    	var comps = $(content).find('[data-body-component]');

			for(var i = 0, len = comps.length ; i < len ; i++){				
				var comp = dao.getCompDBById($(comps[i]), 'data-comp-id');

				if(!comp || !comp.runtime) continue;

				if(comp.runtime && typeof comp.runtime != 'function'){
					comp.runtime = util.eval(comp.runtime);
				}				
				comp.runtime($(comps[i]), comp);
			};
	    }

	    return self;
	}]);