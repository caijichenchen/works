const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
	name:{
		type:String,
		required:[true,"分类必须输入"],
	},
	order:{
		type:Number,
		default:0
	}
})
const CategoryModel = mongoose.model('category',CategorySchema);

module.exports = CategoryModel;