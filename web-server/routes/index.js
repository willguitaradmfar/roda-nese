var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {

	fs.readdir(path.join(__dirname, '../public'), function (err, data) {
		if(err) throw err;		
		res.render('index', { title: 'Desenhador' , paths : data});
	});  
});

module.exports = router;
