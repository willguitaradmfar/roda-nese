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

app.get('/chart', function(req, res){

    res.json({data : [{key : 'Aécio', val : Math.round(Math.random()*100)},{key : 'dilma', val : Math.round(Math.random()*100)}, {key : 'marina', val : Math.round(Math.random()*100)}]});
});

app.get('/chartLine', function(req, res){

    function sampleData() {
          var series1 = [],
              series2 = [],
              series3 = [];

          for(var i = 1; i < 100; i++) {
            series1.push({
              x: i, y: 100 / i
            })
            if (i % 2 == 0)
              series2.push({
                x: i, y: i / 2
              })
            if (i % 5 == 0)
              series3.push({
                x: i, y: Math.random()*100
              })
          }

          return [
            {
              key: "100 / x",
              values: series1,
              color: "blue"
            },
            {
              key: "x / 2",
              values: series2,
              color: "#66ccff"
            },
            {
              key: "random",
              values: series3,
              color: "green"
            },
            {
              key: "???",
              color: "red",
              values: [
                {x: 3, y: 99},
                {x: 30, y: 66},
                {x: 30, y: 22},
                {x: 20, y: 88},
                {x: 99, y: 33}
              ]
            }
          ];
        };

    res.json({dataline : sampleData()});
});


app.post('/pessoa', function(req, res){

	res.json('ok');
});


app.listen(process.env.PORT || 3005);
