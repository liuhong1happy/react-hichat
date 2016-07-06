'use strict';

module.exports = {
  port:  process.env.PORT || 3000,
  mongo: {
    uri: 'mongodb://localhost/admin',
    options: {
      	user:'mongo',          //生产环境用户名
      	pass:'123456',           //生产环境密码
		promiseLibrary: require('bluebird')
    }
  },
  redis: {
    db: 1
  },
  session:{
  	cookie:  {domain:'.jackhu.top',maxAge: 60000*5}
  }
};