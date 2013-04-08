var fs = require('fs'),
    port = process.env.PORT;

var express = require("express");
var app = express();
app.fs = fs;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

var dir = __dirname + '/site/';

//Configure
app.configure(function() {
    app.use(allowCrossDomain);
    app.set('views', dir);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express['static'](dir));
    app.use(app.router);
});

//Mocker
app.mocker = require("./mocker.js");

// Routes
require('./routes.js')(app, app.mocker);

//Start Listening
app.listen(port);