var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var IncludeAll = require('include-all');
var settings = require('./settings');
var mongo = require('./mongo');


module.exports = function(app, express) {


    // 设置默认环境变量
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    
    // 加载models
    var modelsPath = path.join(settings.root + '/server/models');
    fs.readdirSync(modelsPath).forEach(function (file) {
        if (/(.*)\.(js$|coffee$)/.test(file)) {
            require(modelsPath + '/' + file);
        }
    });
    
    
    
    // view engine setup
    app.engine('html',ejs.renderFile);
    app.set('views', path.join(settings.root + '/server/views'));
    app.set('view engine', 'html');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use('/static',express.static(path.join(settings.root + '/server/public')));

    
    // get all routes
    var routes = IncludeAll({ dirname: path.join(settings.root + '/server/routes'), filter: /(.+)\.js$/, excludeDirs: /^\.(git|svn)$/ });
    
    // routes
    app.use('/', routes.index)
        .use('/', routes.users)
        .use(function(req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });
    
    // Start server
    app.listen(settings.port, function () {
        console.log('Express server listening on %d, in %s mode', settings.port, process.env.NODE_ENV);
    });
}