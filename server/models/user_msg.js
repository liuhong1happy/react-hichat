'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserMsgSchema = new Schema({
	user_friends:String,
	msg_content:String,
	msg_date:{
		type:Date,
		default: Date.now
	},
	user_id: Schema.Types.ObjectId
})

var UserMsg = mongoose.model('UserMsg', UserMsgSchema);

module.exports = UserMsg;