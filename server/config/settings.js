'use strict';
var path = require('path');
module.exports = {
  port:  process.env.PORT || 8081,
  mongo: {
    uri: 'mongodb://localhost:27017/admin',
    options: {
      	user:'admin',          //生产环境用户名
      	pass:'123456',           //生产环境密码
		promiseLibrary: require('bluebird')
    }
  },
  redis: {
    db: 1
  },
  session:{
  	cookie:  {domain:'.jackhu.top',maxAge: 60000*5}
  },
  root: path.normalize(__dirname + '/../..')
};