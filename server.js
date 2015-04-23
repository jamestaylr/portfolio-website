// Native Library Imports
var http = require('http');
var fs = require('fs');
var path = require('path');

// Dependency Library Imports
var express = require('express');
var marked = require('marked');

var domain = require('domain');
var d = domain.create();

// Generate a log file
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/sys.log', {
    flags: 'a'
});
var log_stdout = process.stdout;

// Defines the port the server will run on
var port = 8080;

d.on('error', function(err) {
    console.error(err);
});

// Create the path to the content
var filePath = path.join(__dirname, 'views/pages/content.md');

// Read the contents of the file
fs.readFile(filePath, {
    encoding: 'utf-8'
}, function(err, data) {
    if (err) {
        return console.log(err);
    }

    formattedContent = marked(data);

    // Create Express and set up the EJS view engine
    var app = express();
    app.set('view engine', 'ejs');
    app.use("/resources", express.static(__dirname + "/resources"));

    // Setup the index page view
    app.get('/', function(req, res) {
        console.log(getFormattedDate() + req.method + " " + req.url + " by " + req.connection.remoteAddress);
        res.render('pages/index', {
            title: "James Taylor",
            content: formattedContent
        });
    });

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