var http = require('http');
var express = require('express');

var app = express();
app.set('view engine', 'ejs');

// Setup the index page view
app.get('/', function(req, res) {
	res.render('pages/index');
    // Defines error handling
    app.use(function(req, res, next) {
        res.status(404);

        // Respond with HTML page
        if (req.accepts('html')) {
            res.render('404', {
                url: req.url
            });
            return;
        }

        // Respond with JSON
        if (req.accepts('json')) {
            res.send({
                error: 'Not found'
            });
            return;
        }

        // Default to plain-text
        res.type('txt').send('Not found');
    });

    // Bind the server process on the port
    var server = app.listen(port, function() {
        console.log("Server successfully started!");
    });
});

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
