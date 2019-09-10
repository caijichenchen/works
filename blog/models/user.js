const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username:{
		type:String,
		required:[true,"用户名必须输入"],
		minlength:[3,"用户名最小长度为3"],
		maxlength:[10,"用户名最大长度为10"]
	},
	password:{
		/*
		type:String,
		required:[true,"密码必须输入"],
		minlength:[3,"密码最小长度为3"],
		maxlength:[6,"密码最大长度为6"]
		*/
		type:String,
		required:[true,"密码必须输入"]
	},
	isAdmin:{
		type:Boolean,
		default:false
	}
})
const UserModel = mongoose.model('blog',UserSchema);

module.exports = UserModel;