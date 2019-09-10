var express = require('express');
var router = express.Router();
const { UserModel,ChatModel } = require('../db/models.js');
const md5 = require('blueimp-md5');
const filter = {password: 0} //查 询 时 过 滤 出 指 定 的 属 性

//注册路由
router.post('/register',function(req,res){
	//读取参数数据
	const { username,password,type } = req.body;
	//处理数据
	UserModel.findOne({username},function(err,user){
		if(user){
			res.send({
				code:1,
				msg:"用户名已存在"
			})
		}else{
			new UserModel({username,type,password:md5(password)}).save(function(err,user){
				const data = { username,type,_id:user._id };
				res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7}) 
				res.send({
					code:0,
					data
				})
			})
		}
	})
})

//登陆路由
router.post('/login',function(req,res){
	//获取参数数据
	const { username,password } = req.body;
	//查询数据是否匹配
	UserModel.findOne({username,password:md5(password)},filter,function(err,user){
		if(user){
			//生成一个cookie(userid: user._id),并交给浏览器保存 
			res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7}) 
			res.send({
				code:0,
				msg:"登陆成功",
				data:user
			})
		}else{
			res.send({
				code:1,
				msg:"用户名或密码错误"
			})
		}
	})
})

//更新用户信息路由
router.post('/update',function(req,res){
	//从请求的cookie中获取用户的id
	const userid = req.cookies.userid
	//不存在返回提示信息
	if(!userid){
		return res.send({
			code:1,
			msg:"请先登陆"
		})
	}
	//存在时得到数据用户
	const user = req.body
	UserModel.findByIdAndUpdate({_id:userid},user,function(err,oldUser){
		if(!oldUser){
			//如果用户不存在删除cookies
			res.clearCookie('userid')
			res.send({
				code:1,
				msg:"请先登陆"
			})
		}else{
			const { _id,username,type } = oldUser
			//合并用户数据,返回更新后的数据
			const data = Object.assign({ _id,username,type },user)
			res.send({
				code:0,
				data
			})
		}
	})
})

//获取用户信息路由
router.get('/user',function(req,res){
	//从请求的cookie中获取用户的id
	const userid = req.cookies.userid
	//不存在返回提示信息
	if(!userid){
		res.send({
			code:1,
			msg:"请先登录"
		})
	}else{
		UserModel.findOne({_id:userid},filter,function(err,user){
			res.send({
				code:0,
				data:user
			})
		})
	}
})

//获取用户列表
router.get('/userlist',function(req,res){
	const { type } = req.query
	UserModel.find({type},filter,function(err,users){
		return res.json({
			code:0, 
			data: users
		})
	})
})

//获取当前用户所有的聊天列表
router.get('/msglist', function (req, res) { 
	//获取cookie中的userid 
	const userid = req.cookies.userid 
	//查询得到所有user文档数组
	UserModel.find(function (err, userDocs) { 
		//用对象存储所有user信息:key为user的_id,val为name和header组成的user对象
		const users = {} //对 象 容 器 
		userDocs.forEach(doc => { 
			users[doc._id] = {username: doc.username, header: doc.header} 
		}) 
		ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filter, function (err, chatMsgs) { 
			//返回包含所有用户和当前用户相关的所有聊天消息的数据 
			res.send({
				code: 0, 
				data: {users, chatMsgs}
			}) 
		}) 
	}) 
})

//指定消息为已读
router.post('/readmsg',function(req,res){
	const from = req.body.from
	const to = req.cookies.userid
	ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function (err, doc) { 
		console.log('/readmsg', doc) 
		res.send({
			code: 0, 
			data: doc.nModified
		}) //更新的数量 
	}) 
})

module.exports = router
