inject.define("plugins.exports.zip", [
        "core.utils.zip",
        "core.utils.http",
    function (zip, http) {
        var self = {};
        self.category = 'export';
        self.name = 'Zip';
        self.icon = 'save';

        var hand = {};

        var dependencysJS = [
            'dependencyRuntime/jquery/jquery-ui-1.11.1/external/jquery/jquery.js',
            'dependencyRuntime/angular.min.js',
            'dependencyRuntime/bootstrap.min.js',
            'dependencyRuntime/ChartJS/Chart.js',
            'dependencyRuntime/soapjs/soapclient.js',
            'js/app.js',
            'js/directives/directive.js',
            'js/services/service.js',
            'js/controllers/controller.js',
            'js/filters/filter.js'
        ];

        var dependencysCSS = [
            'dependencyRuntime/bootstrap.min.css'
        ];

        var importsCopy = [
            'dependencyRuntime/jquery/jquery-ui-1.11.1/external/jquery/jquery.js',
            'dependencyRuntime/angular.min.js',
            'dependencyRuntime/bootstrap.min.js',
            'dependencyRuntime/ChartJS/Chart.js',
            'dependencyRuntime/soapjs/soapclient.js',
            'dependencyRuntime/bootstrap.min.css',          
            'dependencyRuntime/bootstrap-theme/fonts/glyphicons-halflings-regular.woff',
            'dependencyRuntime/bootstrap-theme/fonts/glyphicons-halflings-regular.ttf',
            'dependencyRuntime/bootstrap-theme/fonts/glyphicons-halflings-regular.svg',
            'dependencyRuntime/bootstrap-theme/fonts/glyphicons-halflings-regular.eot',
            'image/fav/liferay.ico'
        ];

        self.config = function (hands) {
        	hand = hands;
        };

        var makeFileToZip = function (importsCopy, files) {

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
        
        self.exec = function () {       	

            var _temp = $('<div></div>');

            var dependencysCSSTheme = dependencysCSS.concat(['dependencyRuntime/bootstrap-theme/'+hand.getTheme()+'/bootstrap.min.css']);
            var importsCopyTheme = importsCopy.concat(['dependencyRuntime/bootstrap-theme/'+hand.getTheme()+'/bootstrap.min.css']);

            var head = hand.getHead({
                dependencysJS : dependencysJS,
                dependencysCSS : dependencysCSSTheme
            });

            _temp.append(head);
            _temp.append(hand.getBody());

            var files = [];
            var fileAppJS = {};
            fileAppJS.name = 'app.js';
            fileAppJS.content = hand.getMainModule();
            fileAppJS.folder = 'js';
            files.push(fileAppJS);

            var fileFilterJS = {};
            fileFilterJS.name = 'filter.js';
            fileFilterJS.content = hand.getFilters();
            fileFilterJS.folder = 'js/filters';
            files.push(fileFilterJS);

            var fileDirectiveJS = {};
            fileDirectiveJS.name = 'directive.js';
            fileDirectiveJS.content = hand.getDirectives();
            fileDirectiveJS.folder = 'js/directives';
            files.push(fileDirectiveJS);

            var fileServiceJS = {};
            fileServiceJS.name = 'service.js';
            fileServiceJS.content = hand.getServices();
            fileServiceJS.folder = 'js/services';
            files.push(fileServiceJS);

            var fileControllerJS = {};
            fileControllerJS.name = 'controller.js';
            fileControllerJS.content = hand.getControllers();
            fileControllerJS.folder = 'js/controllers';
            files.push(fileControllerJS);

            var fileHTML = {};
            fileHTML.name = 'index.html';
            fileHTML.content = '<html>'+_temp.html()+'</html>';
            files.push(fileHTML);

            makeFileToZip(importsCopyTheme, files);

            zip.createZip(files);

        };

        return self;
    }]);