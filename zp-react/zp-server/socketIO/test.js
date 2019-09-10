module.exports = function(server){
	const io = require('socket.io')(server)
	//监视客户端与服务器端链接
	io.on('connection',function(socket){
		console.log('hhhhhhhhhhhhhhhhhh');
		//绑定监听,接受客户端发送的消息
		socket.on('sendMsg',function(data){
			console.log('get something',data);
			//处理数据
			data.name = data.name.toUpperCase()
			//服务器端向客户端发送数据
			socket.emit('receiveMsg',data)
			console.log('push something',data);
		})
	})
}