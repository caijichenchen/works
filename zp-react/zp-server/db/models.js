// 1. 连 接 数 据 库 
// 1.1. 引 入 mongoose 
const mongoose = require('mongoose') 
// 1.2. 连 接 指 定 数 据 库 (URL 只 有 数 据 库 是 变 化 的 ) 
mongoose.connect('mongodb://localhost:27017/zp-test') 
// 1.3. 获 取 连 接 对 象 
const conn = mongoose.connection 
// 1.4. 绑 定 连 接 完 成 的 监 听 ( 用 来 提 示 连 接 成 功 ) 
conn.on('connected', function () { console.log('数据库连接成功') })
// 2.得 到 对 应 特 定 集 合 的 Model 
// 2.1. 字 义 Schema( 描 述 文 档 结 构 ) 
const userSchema = mongoose.Schema({ 
	username: {type: String, required: true}, //用 户 名
	password: {type: String, required: true}, //密 码
	type: {type: String, required: true}, //用 户 类 型 : dashen/laoban
	header: {type: String}, //头 像 名 称
	post: {type: String}, //职 位
	info: {type: String}, //个 人 或 职 位 简 介 
	company: {type: String}, // 公 司 名 称 
	salary: {type: String} //月薪
}) 
// 2.2.定 义 Model( 与 集 合 对 应 ,可 以 操 作 集 合 )
const UserModel = mongoose.model('user', userSchema) 
// 2.3. 向 外 暴 露 Model 
exports.UserModel = UserModel



//定义Chats集合的文档结构 
const chatSchema = mongoose.Schema({ 
	from: {type: String, required: true}, //发送用户的id
	to: {type: String, required: true}, //接收用户的id 
	chat_id: {type: String, required: true}, //from和to组成的字符串
	content: {type: String, required: true}, //内容
	read: {type:Boolean, default: false}, //标识是否已读
	create_time: {type: Number} //创建时间
}) 
//定义能操作chats集合数据的Model 
const ChatModel = mongoose.model('chat', chatSchema) 
//暴露Model 
exports.ChatModel = ChatModel