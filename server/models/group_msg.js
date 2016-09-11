'use strict';

var mongoose = require('../config/mongo');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var GroupMsgSchema = new Schema({
	group_id: Schema.Types.ObjectId,
	msg_content:String,
	msg_date:{
		type:Date,
		default: Date.now
	},
	user_id: Schema.Types.ObjectId
})

var GroupMsg = mongoose.model('GroupMsg', GroupMsgSchema);

module.exports = GroupMsg;