const { ChatModel } = require('../db/models.js')
module.exports = function(server){
	const io = require('socket.io')(server)
	//监视客户端与服务器端链接
	io.on('connection',function(socket){
		console.log('someone connect ...');
		//绑定监听,接受客户端发送的消息
		socket.on('sendMsg',function({from,to,content}){
			console.log('get something',{from,to,content});
			//处理数据(保存消息)
			//准备数据
			const chat_id = [from,to].sort().join('_')//from_to  to_from
			const create_time = Date.now()
			new ChatModel({from,to,content,chat_id,create_time}).save(function(err,chatMsg){
				// 向所有连接上的客户端发消息
        		io.emit('receiveMsg', chatMsg)
			})
		})
	})
}