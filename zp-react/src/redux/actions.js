import { reqRegister,reqLogin,reqUpdateUser,reqUser,reqUserList,reqChatMsgList,reqReadMsg } from '../api/index.js'
import { 
	AUTH_SUCCESS,
	ERROR_MSG,
	RECEIVE_USER,
	RESET_USER,
	RECEIVE_USER_LIST,
	RECEIVE_MSG_LIST,
	RECEIVE_MSG,
 } from './action-types.js'
import io from 'socket.io-client'

//单例对象
function initIO(dispatch,userid) {
	if(!io.socket){
		//连接服务器
		io.socket = io('ws://localhost:4000')
		//绑定监听
		io.socket.on('receiveMsg',function(chatMsg){
			console.log('客户端接收服务器发送消息',chatMsg);
			if(userid === chatMsg.from || userid === chatMsg.to){
				dispatch(receiveMsg(chatMsg,userid))
			}
		})
	}
}


//同步错误消息 
const errorMsg = (msg) => ({type:ERROR_MSG, data: msg}) 
// 同步成功响应 
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
//同步接收用户 
const receiveUser = (user) => ({type: RECEIVE_USER, data: user}) 
// 同步重置用户 
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
//用户列表 
const receiveUserList = (users) => ({type: RECEIVE_USER_LIST, data: users}) 
//读取消息
const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs, userid}})
//接收消息
const receiveMsg = (chatMsg,userid) => ({type:RECEIVE_MSG,data:{chatMsg,userid}})

//获取消息列表数据
async function getMsgList(dispatch,userid){
	initIO(dispatch,userid)
	const response = await reqChatMsgList()
	const result = response.data
	if(result.code === 0){
		const { users,chatMsgs } = result.data
		dispatch(receiveMsgList({users,chatMsgs,userid}))
	}
}

//发送消息
export const sendMsg = ({from,to,content}) =>{
	return dispatch => {
		getMsgList(dispatch,from)
		//发消息
		io.socket.emit('sendMsg',{from,to,content})
	}
}

//注册
export const register = (user) =>{
	const { username,password,respassword,type } = user
	//做表单的前台验证
	if(!username){
		return errorMsg("用户名不能为空")
	}
	if(password != respassword){
		return errorMsg("两次密码不一致")
	}
	return async dispatch =>{
		const response = await reqRegister({ username,password,type })
		const result = response.data
		if(result.code === 0){
			getMsgList(dispatch,result.data._id)
			//成功
			dispatch(authSuccess(result.data))
		} else{
			//失败
			dispatch(errorMsg(result.msg))
		}
	}
}

//登陆
export const login = (user) =>{
	const { username,password } = user
	//做表单的前台验证
	if(!username){
		return errorMsg("用户名不能为空")
	}
	if(!password){
		return errorMsg("密码不能为空")
	}
	return async dispatch =>{
		const response = await reqLogin(user)
		const result = response.data
		if(result.code === 0){
			getMsgList(dispatch,result.data._id)
			//成功
			dispatch(authSuccess(result.data))
		} else{
			//失败
			dispatch(errorMsg(result.msg))
		}
	}
}

//更新用户信息
export const updateUser = (user) =>{
	return async dispatch =>{
		const response = await reqUpdateUser(user)
		const result = response.data
		//请求成功
		if(result.code === 0){//更新成功
			dispatch(receiveUser(result.data))
		}else{//更新失败
			dispatch(resetUser(result.msg))
		}
	}
}

//获取用户信息
export const getUser = () =>{
	return async dispatch =>{
		const response = await reqUser()
		const result = response.data
		if(result.code === 0){
			getMsgList(dispatch,result.data._id)
			dispatch(receiveUser(result.data))
		}else{
			dispatch(resetUser(result.msg))
		}
	}
}

//异步获取用户列表
export const getUserList = (type) => { 
	return async dispatch => { 
		const response = await reqUserList(type)
		const result = response.data 
		if (result.code === 0) { 
			dispatch(receiveUserList(result.data)) 
		}
	}
}

