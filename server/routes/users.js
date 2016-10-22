var express = require('express');
var router = express.Router();
var api = require('../api/users');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.post('/api/login', multipartMiddleware, api.userLogin);

module.exports = router;
