const rq = require('request-promise-native')
const { appID,appsecret } = require('../config')
const api = require('../utils/api.js')
const {writeFileAsync,readFileAsync} = require('../utils/tools.js')


class Wechat {
	constructor() {

	}
	//用来获取access_token
	getAccessToken() {
		//定义请求地址
		const url = `${api.accessToken}&appid=${appID}&secret=${appsecret}`;
		//发送请求
		return new Promise((resolve,reject)=>{
			rq({method:'GET',url,json:true})
			.then(res=>{
				console.log(res);
				//设置access_token过期时间
				res.expires_in = Date.now() + (res.expires_in - 300)*1000;
				resolve(res)
			})
			.catch(err=>{
				console.log(err);
				reject('getAccessToken err')
			})
		})
	}
	//用来保存access_token
	saveAccessToken(accessToken){
		return writeFileAsync(accessToken,'accessToken.txt')
	}
	//读取access_token文件
	readAccessToken(){
		return readFileAsync('accessToken.txt')
	}
	//判断access_token是否过期
	isValidAccessToken(data){
		//检查参数是否有效
		if(!data && !data.access_token && !data.expires_in){
			//代表数据无效
			return false
		}

		//检测access_token是否在有效期
		return data.expires_in > Date.now()
	}
	//用来读取access_token文件
	fetchAccessToken () {
	    //优化
	    if (this.access_token && this.expires_in && this.isValidAccessToken(this)) {
	      //说明之前保存过access_token，并且它是有效的, 直接使用
	      return Promise.resolve({
	        access_token: this.access_token,
	        expires_in: this.expires_in
	      })
	    }
	    //是fetchAccessToken函数的返回值
	    return this.readAccessToken()
	      .then(async res => {
	        //本地有文件
	        //判断它是否过期
	        if (this.isValidAccessToken(res)) {
	          //有效的
	          return Promise.resolve(res);
	          // resolve(res);
	        } else {
	          //过期了
	          //发送请求获取access_token(getAccessToken)，
	          const res = await this.getAccessToken();
	          //保存下来（本地文件）(saveAccessToken)
	          await this.saveAccessToken(res);
	          //将请求回来的access_token返回出去
	          return Promise.resolve(res);
	          // resolve(res);
	        }
	      })
	      .catch(async err => {
	        //本地没有文件
	        //发送请求获取access_token(getAccessToken)，
	        const res = await this.getAccessToken();
	        //保存下来（本地文件）(saveAccessToken)
	        await this.saveAccessToken(res);
	        //将请求回来的access_token返回出去
	        return Promise.resolve(res);
	        // resolve(res);
	      })
	      .then(res => {
	        //将access_token挂载到this上
	        this.access_token = res.access_token;
	        this.expires_in = res.expires_in;
	        //返回res包装了一层promise对象（此对象为成功的状态）
	        //是this.readAccessToken()最终的返回值
	        return Promise.resolve(res);
	      })
	}

	//用来获取jsapi_ticket
	getTicket() {
		//发送请求
		return new Promise(async(resolve,reject)=>{
			//获取access_token
		    const data = await this.fetchAccessToken();
		    //定义请求的地址
		    const url = `${api.ticket}&access_token=${data.access_token}`;
			rq({method:'GET',url,json:true})
			.then(res=>{
				resolve({
					ticket: res.ticket,
            		expires_in: Date.now() + (res.expires_in - 300) * 1000
				})
			})
			.catch(err=>{
				console.log(err);
				reject('getTicket err')
			})
		})
	}
	//用来保存access_token
	saveTicket (ticket) {
	   return writeFileAsync(ticket, 'ticket.txt');
	}
	//读取access_token文件
	readTicket () {
	   return readFileAsync('ticket.txt');
	}
	//判断access_token是否过期
	isValidTicket(data){
		//检查参数是否有效
		if(!data && !data.access_token && !data.expires_in){
			//代表数据无效
			return false
		}

		//检测access_token是否在有效期
		return data.expires_in > Date.now()
	}
	//用来读取access_token文件
	fetchTicket () {
	    //优化
	    if (this.access_token && this.ticket_expires_in && this.isValidTicket(this)) {
	      //说明之前保存过access_token，并且它是有效的, 直接使用
	      return Promise.resolve({
	        ticket: this.ticket,
        	expires_in: this.ticket_expires_in
	      })
	    }

	    return this.readTicket()
	      .then(async res => {
	        //本地有文件
	        //判断它是否过期
	        if (this.isValidTicket(res)) {
	          //有效的
	          return Promise.resolve(res);
	        } else {
	          //过期了
	          const res = await this.getTicket();
	          await this.saveTicket(res);
	          return Promise.resolve(res);
	        }
	      })
	      .catch(async err => {
	        //本地没有文件
	        const res = await this.getTicket();
	        await this.saveTicket(res);
	        return Promise.resolve(res);
	      })
	      .then(res => {
	        //将ticket挂载到this上
	        this.ticket = res.ticket;
	        this.ticket_expires_in = res.expires_in;
	        //返回res包装了一层promise对象（此对象为成功的状态）
	        return Promise.resolve(res);
	      })
	}


	//自定义菜单
	createMenu(menu){
		return new Promise(async(resolve,reject)=>{
			//获取access_token
			const data = await this.fetchAccessToken()
			//定义请求地址
			const url = `${api.menu.create}access_token=${data.access_token}`;
			//发送请求
			const result = await rp({method: 'POST', url, json: true, body: menu});
			resolve(result)
		})
	}
	//删除自定义菜单
	deleteMenu() {
		return new Promise(async(resolve,reject)=>{
			//获取access_token
			const data = await this.fetchAccessToken()
			//定义请求地址
			const url = `${api.menu.delete}access_token=${data.access_token}`;
			//发送请求
			const result = await rp({method: 'GET', url, json: true});
			resolve(result)
		})
	}
}


// (async ()=>{
// 	const w = new Wechat()
// 	//删除之前定义菜单
// 	// let result = await w.deleteMenu()
// 	//定义新的菜单
// 	// result = await w.createMenu()

// 	const data = await w.fetchTicket();
//   	console.log(data);
// })()

module.exports = Wechat;