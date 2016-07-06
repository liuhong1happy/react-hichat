'use strict';


var fs = require('fs');
var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var errorHandler = require('errorhandler');

var settings = require('./config/settings');

// 设置默认环境变量
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// 连接数据库.
mongoose.connect(settings.mongo.uri, settings.mongo.options);
// 加载models
var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(function (file) {
	if (/(.*)\.(js$|coffee$)/.test(file)) {
		require(modelsPath + '/' + file);
	}
});

// Express
var app = express();
require('./config/express')(app);
require('./routes')(app);

if ('development' === process.env.NODE_ENV) {
  	app.use(errorHandler());
}else{
	app.use(function (err, req, res, next) {
	  return res.status(500).send();
	});
}

// Start server
app.listen(settings.port, function () {
  	console.log('Express server listening on %d, in %s mode', settings.port, process.env.NODE_ENV);
});

exports = module.exports = app;