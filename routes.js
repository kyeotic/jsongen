var fs = require('fs');

module.exports = function(app, mocker){
    //Index
    app.get('/', function(req, res){        
        res.render('index');
    });
    //Render JSON Template
    app.post('/', function(req, res){
        res.json(mocker(req.body.template, req.body.options));
    });
};