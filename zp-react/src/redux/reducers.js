/* 
包 含 多 个 用 于 生 成 新 的 state的 reducer函 数 的 模 块
*/ 
import {combineReducers} from 'redux'
import { AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER, RESET_USER,RECEIVE_USER_LIST,RECEIVE_MSG_LIST,RECEIVE_MSG } from './action-types.js'
import { getRedirectTo } from '../utils/index.js'

const initUser = {
	username:'',
	type:'',
	msg:'',
	redirectTo:'',//需要自动指定定向路径
}
// 产生user状态的reducer
function user(state=initUser,action){
	switch(action.type){
		case AUTH_SUCCESS:
			const { type,header } = action.data
			return {...action.data,redirectTo:getRedirectTo(type,header)}
		case ERROR_MSG:
			return {...state,msg:action.data}
		case RECEIVE_USER: //接收用户
			return action.data//返回一个新的user信息
		case RESET_USER: //重置用户 
			return {...initUser, msg: action.data}
		default:
		console.log("state",state);
			return state
	}
}
const initUserList = []
//用户列表
function userList(state=initUserList,action){
	switch(action.type) {
		case RECEIVE_USER_LIST:
			return action.data
		default:
			return state
	}
}
//聊天
const initChat = {
	users:{},//key为user的_id,val为name和header组成的user对象
	chatMsgs:[],
	unReadCount:0//总未读数量
}
function chat(state=initChat,action){
	switch(action.type) {
		case RECEIVE_MSG_LIST :
		const { users,chatMsgs } = action.data
			return {
				users,
				chatMsgs,
				unReadCount:0
			}
		case RECEIVE_MSG:
			const chatMsg = action.data
			return {
				users:state.users,
				chatMsgs:[...state.chatMsgs,chatMsg],
				unReadCount:0
			}
		default :
			return state
	}
}

//返 回 合 并 后 的 reducer函 数 
export default combineReducers({ 
	user,
	userList,
	chat
})
