var http = require('http');
var express = require('express');

var app = express();
app.set('view engine', 'ejs');

// Setup the index page view
app.get('/', function(req, res) {
	res.render('pages/index');
});

app.listen(8080);
/*
 * Returns a fomatted date as a String in brackets, for logging purposes
 */
function getFormattedDate() {
    return "[" + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + "] ";
}

/*
 * Overloads the logging function 
 */ 
console.log = console.error = function(message) {
    log_file.write(util.format(message) + '\n');
    log_stdout.write(util.format(message) + '\n');
};
