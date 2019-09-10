//查找页面
const express = require('express');
const CommentModel = require('../models/comment.js');
const router = express.Router();
//权限验证
router.use((req,res,next)=>{
	if(req.userInfo._id){
		next()
	}else{
		res.send('<h1>请登陆</h1>')
	}
})

router.post('/add',(req,res)=>{
	const { val,article } = req.body;
	CommentModel.insertMany({
		content:val,
		article,
		user:req.userInfo._id
	})
	.then(comment=>{
		CommentModel.getPaginationCommentData(req,{article:article})
		.then(data=>{
			res.json({
				status:200,
				message:"添加评论成功",
				data:data
			})
		})
		.catch(err=>{
			console.log("err1",err);
			res.json({
				status:404,
				message:"添加评论失败,请稍后重试"
			})
		})
	})
	.catch(err=>{
		console.log("err2",err);
		res.json({
			status:404,
			message:"添加评论失败,请稍后重试",
		})
	})
})
//处理评论ajax请求
router.get('/list',(req,res)=>{
	const id = req.query.id
    const query = {}
    if(id){
        query.article = id
    }
	CommentModel.getPaginationCommentData(req,query)
	.then(data=>{
		res.json({
			status:200,
			message:"获取评论数据成功",
			data:data
		})
	})
	.catch(err=>{
		console.log(err);
		res.json({
			status:404,
			message:"获取评论数据失败"
		})
	})
})
module.exports = router;
