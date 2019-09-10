//查找页面
const express = require('express');
const multer = require('multer');
const upload = multer({dest:'public/uploads/'});
const UserModel = require('../models/user.js');
const ArticleMdoel = require('../models/article.js');
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

//显示文章管理首页
router.get('/',(req,res)=>{
	// res.send('hah');
	// res.render('admin/category_list',{
	// 	userInfo:req.userInfo
	// });
	ArticleMdoel.getPaginationArticleData(req)
	.then(data=>{
		// console.log(data);
		res.render('admin/article_list',{
			userInfo:req.userInfo,
			articles:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:"/article"
		})
	})
	.catch(err=>{
		console.log(err);
	})
})
//显示添加文章页面信息
router.get('/add',(req,res)=>{
	CategoryMdoel.find({},"name")
    .sort({order:-1})
    .then(categories=>{
    	res.render("admin/article_add",{
			userInfo:req.userInfo,
			categories
		})
    })
})
//处理添加文章
router.post('/add',(req,res)=>{
	const { title,category,intro,content } = req.body;
    ArticleMdoel.insertMany({
        title,
        category,
        intro,
        content,
        user:req.userInfo._id
    })
    .then(articles=>{
        res.render("admin/success",{
            message:"新增文章成功",
            url:'/article'
        })
    })
    .catch(err=>{
        res.render("admin/err",{
            message:"数据库操作失败",
            url:'/article'
        })
    })
})
//编辑文章页面
router.get('/edit/:id',(req,res)=>{
	const { id } = req.params;
	console.log("id1",id);
	CategoryMdoel.find({},"name")
    .sort({order:-1})
    .then(categories=>{
    	ArticleMdoel.findById(id)
		.then(article=>{
			res.render("admin/article_edit",{
				userInfo:req.userInfo,
				article,
				categories
			})
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
	let { title,category,intro,content,id } = req.body;
	ArticleMdoel.updateOne({_id:id},{title,category,intro,content})
	.then(result=>{
		res.render("admin/success",{
			message:"更改文章成功",
			url:'/article'
		})
	})
	.catch(err=>{
		console.log(err);
	})
})
//删除分类
router.get('/del/:id',(req,res)=>{
	const { id } = req.params;
	console.log("id2",id);
	ArticleMdoel.deleteOne({_id:id})
	.then(result=>{
		res.render("admin/success",{
			message:"删除分类成功",
			url:'/article'
		})
	})
	.catch(err=>{
		res.render("admin/err",{
			message:"删除分类失败"
		})
	})
})
//图片上传接口
router.post('/uploadImage',upload.single('upload'),(req,res)=>{
	const uploadedFilePath = '/uploads/'+req.file.filename;
	res.json({
		uploaded:true,
		url:uploadedFilePath
	})
})
module.exports = router;
