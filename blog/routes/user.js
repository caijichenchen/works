const express = require('express');
const UserModel = require('../models/user.js');
const hmac = require('../util/hmac.js');
const router = express.Router();
//注册请求并查询是否有重复用户名完成注册
router.post('/register',(req,res)=>{
	//1.获取参数
	const { username,password } = req.body;//post请求可以中间件直接拿到请求参数
	//2.同名验证
	UserModel.findOne({username:username})
	.then(user=>{
		if(user){
			res.json({
				status:404,
				message:"该用户名已经被使用"
			})
		}
		else{
			if(password.length >=3 && password.length<= 6){
				//3.插入数据
				UserModel.insertMany({
					username:username,
					password:hmac(password)
				})
				.then(user=>{
					res.json({
						status:200,
						message:"注册成功",
						data:user
					})
				})
				.catch(err=>{
					throw err
				})
			}else{
				res.json({
					status:404,
					message:"密码的长度必须是3-6位"
				})
			}
		}
	})
	.catch(err=>{
		res.json({
			status:404,
			message:"服务器无响应,请稍后重试"
		})
	})
})
//登陆请求匹配用户名密码
router.post('/login',(req,res)=>{
	// console.log(req.cookies);
	//1.获取参数
	const { username,password } = req.body;
	//2.校验
	UserModel.findOne({username:username,password:hmac(password)})
	.then(user=>{
		//验证成功
		if(user){
			//生成cookies返回给前端
			// req.cookies.set('userInfo',JSON.stringify(user));
			//添加session
			req.session.userInfo = user;
			res.json({
				status:200,
				message:"登陆成功",
				data:user
			})
		}
		//验证失败
		else{
			res.json({
				status:404,
				message:"用户名或密码错误"
			})
		}
	})
})

router.get('/logout',(req,res)=>{
	// req.cookies.set('userInfo',null);
	req.session.destroy();
	res.json({
		status:200,
		message:"退出登陆成功"
	})
})

module.exports = router;