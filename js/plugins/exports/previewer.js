inject.define("plugins.exports.previewer", [function () {
    var self = {};
    self.category = 'previewer';
    self.name = 'previewer 1024/768';
    self.icon = 'eye-open';

    var hand = {};

    var dependencysJS = [
        'dependencyRuntime/jquery/jquery-ui-1.11.1/external/jquery/jquery.js',
        'dependencyRuntime/angular.min.js',
        'dependencyRuntime/bootstrap.min.js',
        'dependencyRuntime/ChartJS/Chart.js',
        'dependencyRuntime/soapjs/soapclient.js'
    ];

    var dependencysCSS = [
        'dependencyRuntime/bootstrap.min.css'
    ];

    self.config = function (hands) {
    	hand = hands;
    };
    
    self.exec = function () {
        
    	var popup = open('', '_blank', 'width=1024,height=768');

        var _temp = $('<div></div>');

        var dependencysCSSTheme = dependencysCSS.concat(['dependencyRuntime/bootstrap-theme/'+hand.getTheme()+'/bootstrap.min.css']);

        var head = hand.getHead({
            dependencysJS : dependencysJS,
            dependencysCSS : dependencysCSSTheme
        });

        var script = $('<script type="text/javascript"></script>');
        script.append(hand.getMainModule());
        script.append(hand.getFilters());
        script.append(hand.getDirectives());
        script.append(hand.getServices());
        script.append(hand.getControllers());
        head.append(script);
        _temp.append(head);

        _temp.append(hand.getBody());        

        popup.document.open();
        popup.document.write('<html>'+_temp.html()+'</html>');
        popup.document.close();
    };

    return self;
}]);