//查找页面
const express = require('express');
const UserModel = require('../models/user.js');
const CategoryMdoel = require('../models/category.js');
const Category = require('../util/pagination.js');
const router = express.Router();
//权限验证
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请用管理员账号登陆</h1>')
	}
})

//显示后台管理首页
router.get('/',(req,res)=>{
	// res.render('admin/category_list',{
	// 	userInfo:req.userInfo
	// });
	let page = req.query.page;
	const options = {
		page:page,
		method:CategoryMdoel,
		query:{},
		sort:{order:-1}
	}
	Category(options)
	.then(data=>{
		res.render('admin/category_list',{
			userInfo:req.userInfo,
			categories:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:"/category"
		})
	})
	.catch(err=>{
		console.log(err);
	})
})
//显示添加分类页面
router.get('/add',(req,res)=>{
	res.render("admin/category_add",{
		userInfo:req.userInfo
	})
})
//处理添加分类
router.post('/add',(req,res)=>{
	let { name,order } = req.body;
	// console.log(order);
	if(!order){
		order = 0;
	}
	CategoryMdoel.findOne({name:name})
	.then(category=>{
		if(category){
			res.render("admin/err",{
				message:"分类已经存在"
			})
		}else{
			CategoryMdoel.insertMany({name:name,order:order})
			.then(category=>{
				res.render("admin/success",{
					message:"插入成功"
				})
			})
			.catch(err=>{
				let message = "数据库操作失败";
				res.render("admin/err",{
					message:message
				})
			})
		}
	})
	.catch(err=>{
		res.render("admin/err",{
			message:"分类已经存在"
		})
	})
})
//编辑分类页面
router.get('/edit/:id',(req,res)=>{
	console.log("req.params",req.params);
	const { id } = req.params;
	console.log("id1",id);
	CategoryMdoel.findById(id)
	.then(category=>{
		res.render("admin/category_edit",{
			userInfo:req.userInfo,
			category:category
		})
	})
	.catch(err=>{
		res.render("admin/err",{
			message:"操作失败"
		})
	})
})
//处理编辑
router.post('/edit',(req,res)=>{
	let { name,order,id } = req.body;
	if(!order){
		order = 0;
	}
	CategoryMdoel.findById(id)
	.then(category=>{
		if(category.name == name && category.order == order){
			res.render("admin/err",{
				message:"请更新后再提交"
			})
		}else{
			CategoryMdoel.findOne({name:name,_id:{$ne:id}})
			.then(category=>{
				if(category){
					res.render("admin/err",{
						message:"分类已经存在"
					})
				}else{
					CategoryMdoel.updateOne({_id:id},{name,order})
					.then(result=>{
						res.render("admin/success",{
							message:"更改分类成功"
						})
					})
					.catch(err=>{
						console.log(err);
					})
				}
			})
			.catch(err=>{
				console.log(err);
			})
		}
	})
})
//删除分类
router.get('/del/:id',(req,res)=>{
	const { id } = req.params;
	console.log("id2",id);
	CategoryMdoel.deleteOne({_id:id})
	.then(result=>{
		res.render("admin/success",{
			message:"删除分类成功",
			url:'/category'
		})
	})
	.catch(err=>{
		res.render("admin/err",{
			message:"删除分类失败"
		})
	})
})
module.exports = router;
