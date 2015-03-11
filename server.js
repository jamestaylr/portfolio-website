var http = require('http');
var express = require('express');

var app = express();
app.set('view engine', 'ejs');

// Setup the index page view
app.get('/', function(req, res) {
	res.render('pages/index');
});

app.listen(8080);