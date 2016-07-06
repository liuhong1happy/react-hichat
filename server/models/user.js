'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
	user_name:String,
	salt:String,
	user_pwd: String,
	user_type: {
		type : String ,
		default : 'user'
	},
	user_no:{ 
		type:String,
		default: this.genUserNo 
	},
	user_description:String,
	user_avatar: String,
	mobile:String,
	user_groups:Array,
	user_friends:Array,
	upadte_dt:{
		type:Date,
		default: Date.now
	},
	create_dt:{
		type:Date,
		default: Date.now
	}
})

UserSchema
  .virtual('password')
  .set(function(password) {
		this._password = password;
		this.salt = this.makeSalt();
		this.user_pwd = this.encryptPassword(password);
  })
  .get(function() {
	    return this._password;
  });
/**
*
*/
UserSchema
	.path('user_name')
	.validate(function(value, respond) {
		var self = this;
		this.constructor.findOne({user_name: value}, function(err, user) {
			if(err) throw err;
			if(user) {
				if(self.id === user.id) return respond(true);
				return respond(false);
			}
			respond(true);
		});
	}, '这个用户名已经被存在.');

/**
 * methods
 */
UserSchema.methods = {
	//检查用户权限
	hasRole: function(role) {
		var selfRoles = this.user_type;
		return (selfRoles.indexOf('admin') !== -1 || selfRoles.indexOf(role) !== -1);
	},
	//验证用户密码
	authenticate: function(plainText) {
	  return this.encryptPassword(plainText) === this.user_pwd;
	},
	//生成盐
	makeSalt: function() {
	  return crypto.randomBytes(16).toString('base64');
	},
	//生成密码
	encryptPassword: function(password) {
	  if (!password || !this.salt) return '';
	  var salt = new Buffer(this.salt, 'base64');
	  return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
	},
	genUserNo:function(){
		return Math.ceil(Math.random()*1000) + Date.now() + Math.ceil(Math.random()*1000)
	}
}

var User = mongoose.model('User', UserSchema);

module.exports = User;