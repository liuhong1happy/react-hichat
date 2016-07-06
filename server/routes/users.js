var express = require('express');
var router = express.Router();
var api = require('../api/users');

/* GET users listing. */
router.post('/api/login', api.userLogin);

module.exports = router;
