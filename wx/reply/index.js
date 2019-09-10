//验证服务器有效性

const sha1 = require('sha1');
const template = require('./template.js');
const config = require('../config')
const reply = require('./reply');
const {getUserDataAsync,parseXMLAsync,formatMessage} = require('../utils/tools.js')

module.exports = () => {
	return async (req,res,next)=>{
			//微信服务器发送消息携带参数,get请求
			// console.log(req.query);
			/*
				{
					signature: '8b03a6f7e61a455e5cf77102f427955155317b2d',//微信的加密签名
		  			echostr: '1850350652354138223',//微信的随机字符串
		  			timestamp: '1567817837',//微信的发送请求的时间戳
		  			nonce: '877585728//微信的随机数字 
		  		}
			*/
			const { signature,echostr,timestamp,nonce } = req.query;
			const { token } = config;
			//1.将参与微信加密签名的三个参数(timestamp,nonce,token),按照字典序排序并组合在一起,形成一个数组
			//2.将数组的所有参数拼接成一个字符串,进行sha1加密
			const sha1Str = sha1([timestamp,nonce,token].sort().join(''));
			// console.log(sha1Str);
			//3.加密完成就生成了一个signature,和微信发送过来的进行对比
			if(req.method === 'GET'){
				if(sha1Str === signature){
					//如果一样,说明消息来自于微信服务器,返回echostr给微信服务器
					res.send(echostr)
				}else{
					//如果不一样,说明不是微信服务器发送的消息,返回error
					res.end('error')
				}
			}else if(req.method === 'POST'){
				if(sha1Str !== signature){
					res.send('err')
				}

				//接收请求体中的数据
				const xmlData = await getUserDataAsync(req)
				// console.log(xmlData);
				/*
					<xml>
						<ToUserName><![CDATA[gh_6933a6020012]]></ToUserName>//测试号id
						<FromUserName><![CDATA[ocyFCt-yYQiI5z_T0kIKxiOmO6Ps]]></FromUserName>//用户的opendid
						<CreateTime>1567830256</CreateTime>//发送时间
						<MsgType><![CDATA[text]]></MsgType>//发送信息类型
						<Content><![CDATA[1]]></Content>//发送内容
						<MsgId>22445930513075518</MsgId>//消息id  微信服务器会默认保留用户发送信息的数据三天,三天内可查询
					</xml>
				*/

				// console.log(req.query);

				//将xml数据解析为js对象
				const jsData = await parseXMLAsync(xmlData);

				//格式化数据
      			const message = formatMessage(jsData);
      			//根据用户发送信息判断信息类型整合数据
      			const options = await reply(message);
			    console.log("options::",options);
			    //最终回复用户的消息
			    const replyMessage = template(options);
			    console.log("replyMessage::",replyMessage);

				//如果开发者服务器没有返回给微信服务器,微信服务器会发送三次请求
				res.send(replyMessage)
			}else{
				res.send('err')
			}
			
		}
}