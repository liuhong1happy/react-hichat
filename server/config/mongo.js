var settings = require('./settings');
var mongoose = require('mongoose');
// 连接数据库.
mongoose.connect(settings.mongo.uri, settings.mongo.options);

module.exports = mongoose;