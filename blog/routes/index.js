//查找页面
const express = require('express');
const CategoryMdoel = require('../models/category.js');
const CommentModel = require('../models/comment.js');
const ArticleMdoel = require('../models/article.js');
const router = express.Router();

async function getCommonData(){
	//拿到分类集合全部分类数据
	const categoriesPromise = CategoryMdoel.find({},"name").sort({order:1});
	//拿到文章集合全部文章数据
	const articlesPromise = ArticleMdoel.find({},"click title").sort({click:-1}).limit(10);
	const categories = await categoriesPromise;
	const Articles = await articlesPromise;
	return {
		categories,
		Articles
	}
}

router.get('/',(req,res)=>{
	// const userInfo = {};
	// if(req.cookies.get('userInfo')){
	// 	userInfo = JSON.parse(req.cookies.get('userInfo'));
	// }
	// const userInfo = req.cookies.get('userInfo') || {};
	getCommonData()
	.then(data=>{
		const { categories,Articles } = data;
		ArticleMdoel.getPaginationArticleData(req)
		.then(data=>{
			res.render('main/index',{
				userInfo:req.userInfo,
				categories,
				Articles,
				articles:data.docs,
				page:data.page,
				list:data.list,
				pages:data.pages,
				url:"/"
			})
		})
	})
})
//处理文章分页请求ajax
router.get('/articles',(req,res)=>{
	const id = req.query.id
    const query = {}
    if(id){
        query.category = id
    }
	ArticleMdoel.getPaginationArticleData(req,query)
	.then(data=>{
		res.json({
			status:200,
			message:"获取文章数据成功",
			data:data
		})
	})
	.catch(err=>{
		console.log(err);
		res.json({
			status:404,
			message:"获取文章数据失败"
		})
	})
})

router.get('/list/:id',(req,res)=>{
	//点击分类时拿到的分类id
	const id = req.params.id;
	getCommonData()
	.then(data=>{
		const { categories,Articles } = data;
		ArticleMdoel.getPaginationArticleData(req,{category:id})//根据分类的id拿到对应的分类文章
		.then(data=>{
			res.render('main/list',{
				userInfo:req.userInfo,
				categories,
				Articles,
				articles:data.docs,
				page:data.page,
				list:data.list,
				pages:data.pages,
				url:"/",
				currentCategoryId:id//将拿到的分类文章id返回给前台
			})
		})
	})
})

async function getDetailData(req){
	const id = req.params.id;//点击文章标题id获取对应文章信息
	const commonDataPromise = getCommonData();
	// console.log("commonDataPromise::",commonDataPromise);
	//显示对应的文章信息并更新点击数量
	const articleDataPromise = ArticleMdoel.findOneAndUpdate({_id:id},{$inc:{click:1}},{new:true})
								.populate({path:'user',select:'username'})
								.populate({path:'category',select:'name'})
	//在评论集合做拿到对应文章id的评论数据
	const commentPageDataPromise = CommentModel.getPaginationCommentData(req,{article:id});
	const commonData = await commonDataPromise;
	const article = await articleDataPromise;
	const commentsPageData = await commentPageDataPromise;
	const { categories,Articles } = commonData;
	return {
		categories,
		Articles,
		article,
		commentsPageData
	}
}

router.get('/detail/:id',(req,res)=>{
	getDetailData(req)
	.then(data=>{
		// console.log(data);
		const { categories,Articles,article,commentsPageData } = data;
		res.render('main/detail',{
			userInfo:req.userInfo,
			categories,
			Articles,
			article,
			currentCategoryId:article.category._id,
			//评论分页数据
			comments:commentsPageData.docs,
			page:commentsPageData.page,
			list:commentsPageData.list,
			pages:commentsPageData.pages
		})
	})
})

module.exports = router;