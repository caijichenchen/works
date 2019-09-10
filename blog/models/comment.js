const mongoose = require('mongoose');
const moment = require('moment');

const pagination = require('../util/pagination.js');

//1.定义Schema
const CommentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:[true,"评论了内容必须输入"],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog'
    },
    article:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'article'        
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

CommentSchema.virtual('createdTime').get(function(){
    return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
})

CommentSchema.statics.getPaginationCommentData = function(req,query={}){
    let page = req.query.page;
    const options = {
        page:req.query.page,
        method:this,
        query:query,
        sort:{_id:-1},
        populates:[{path: 'user', select: 'username' },{path: 'article', select: 'title'}]
    }
    return pagination(options)
}


const CommentModel = mongoose.model('comment', CommentSchema);

module.exports = CommentModel