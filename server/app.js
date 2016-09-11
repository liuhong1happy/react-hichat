var express = require('express');
var app = express();

require('./config/express')(app, express);

module.exports = app;