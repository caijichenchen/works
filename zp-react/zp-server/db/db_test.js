const md5 = require('blueimp-md5') 
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
	type: {type: String, required: true},
	header:{type: String} //用 户 类 型 : dashen/laoban
	}) 
// 2.2.定 义 Model( 与 集 合 对 应 ,可 以 操 作 集 合 ) 
const UserModel = mongoose.model('user', userSchema) //集 合 名 : users
// 3.1.通 过 Model实 例 的 save() 添 加 数 据 
function testSave() { // user 数 据 对 象 
	const user = { username: 'test1', password: md5('123'), type: 'dashen', } 
	const userModel = new UserModel(user) 
	// 保 存 到 数 据 库 
	userModel.save(function (err, user) { 
		console.log('save', err, user) 
	}) 
}
// testSave()
