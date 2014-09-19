// example using express.js:
var express = require('express')
  , app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'cool beans' }));
    app.use(express.methodOverride());
    app.use(allowCrossDomain);
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.get('/listaDePessoas.json', function(req, res){

	res.json([{name : 'Lucas Braspag', age : 22, rg : '41.555'},{name : 'Ana', age : 26, rg : '654321'},{name : 'Jose', age : 32, rg : '123456'},{name : 'Marcos', age : 52, rg : '2135'}]);
});

app.post('/pessoa', function(req, res){

	res.json('ok');
});


app.listen(process.env.PORT || 3005);
