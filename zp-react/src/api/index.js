/* 
包 含 n个 接 口 请 求 函 数 的 模 块
每 个 函 数 返 回 的 都 是 promise对 象
*/ 
import ajax from './ajax.js'


//请求注册 
export const reqRegister = (user) => ajax('/register', user, 'POST') 
//请求登陆 
export const reqLogin = (user) => ajax('/login', user, 'POST')
//更新用户接口
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')
//获取用户信息
export const reqUser = () => ajax('/user')
//获取用户列表
export const reqUserList = (type) => ajax('/userlist',{type})
//获取当前用户消息列表
export const reqChatMsgList = () => ajax('/msglist')
//修改指定消息为已读
export const reqReadMsg = (from) => ajax('/readmsg',{from},'POST')
