var mongoose = require('mongoose');
var User = mongoose.model('Users');

var userLogin = function(req, res, next) {
	// get body data
	var { username, email} = req.body;
	// check body data
	
	
}

module.exports = {
	userLogin:userLogin
}