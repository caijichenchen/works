const mongoose = require('mongoose');
const Category = require('../util/pagination.js');

const ArticleSchema = new mongoose.Schema({
	title:{
        type:String,
        required:[true,"文章标题必须输入"],
    },
    intro:{
        type:String,
    },
    user:{//作者
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog'
    },
    category:{//分类
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'        
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    click:{
        type:Number,
        default:0
    },
    content:{
        type:String
    }
})

ArticleSchema.statics.getPaginationArticleData = function(req,query){
    let page = req.query.page;
    const options = {
        page:page,
        method:this,
        query:query,
        sort:{_id:-1},
        populates:[{path:'user',select:'username'},{path:'category',select:'name'}]
    }
    return Category(options)
}

ArticleSchema.virtual('createdTime').get(function(){
    return new Date(this.createdAt).toLocaleString();
})

const ArticleModel = mongoose.model('article',ArticleSchema);

module.exports = ArticleModel;