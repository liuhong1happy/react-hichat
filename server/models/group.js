'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var GroupSchema = new Schema({
	group_name:String,
	group_type: {
		type : String ,
		default : 'group'
	},
	group_no:{ 
		type:String,
		default: this.genGroupNo 
	},
	group_description:String,
	group_remove: Boolean,

	group_users:Array,
	upadte_dt:{
		type:Date,
		default: Date.now
	},
	create_dt:{
		type:Date,
		default: Date.now
	}
})

GroupSchema.methods = {
	genGroupNo: function(){
		return Math.ceil(Math.random()*100) + Date.now() + Math.ceil(Math.random()*100)
	}
}


var Group = mongoose.model('Group', GroupSchema);

module.exports = Group;