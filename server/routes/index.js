'use strict';

module.exports = function(app) {
    app.use('/users', require('./user'));
	app.use('/', function (req,res,next) {
			res.render('index', { title: 'Express' });
	})
};
