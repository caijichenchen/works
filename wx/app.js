//引入服务器
const express = require('express');
//引入路由器模块
const router = require('./router');
//引入数据库模块
const db = require('./db');
//创建应用对象
const app = express();
//验证服务器有效性
/*
	1.微信服务器知道开发者服务器是哪个
		-测试号管理页面上填写url开发者服务器地址
			-使用ngrok内网穿透 将本地端口号开启的服务映射外网跨域访问网址
			-ngrok http 3000
		-填写token
			-参与微信签名加密的一个参数
	2.开发者服务器 -验证消息是否来自微信服务器
	目的:计算得出signature微信加密签名,和微信传递过来的signature进行对比,如果一样,说明消息来自于微信服务器,如果不一样,说明不是来自于微信服务器
		1.将参与微信加密签名的三个参数(timestamp,nonce,token),按照字典序排序并组合在一起,形成一个数组
		2.将数组的所有参数拼接成一个字符串,进行sha1加密
		3.加密完成就生成了一个signature,和微信发送过来的进行对比
			如果一样,说明消息来自于微信服务器,返回echostr给微信服务器
			如果不一样,说明不是微信服务器发送的消息,返回error
*/

//配置模板资源目录
app.set('views', './views');
//配置模板引擎
app.set('view engine', 'ejs');

//接收所有消息
(async () => {
	//等待连接数据库
  	await db;
  	//应用路由器
  	app.use(router);
})()
//监听端口号
app.listen(3000,()=>console.log('connection success ...'))