/* 
使 用 axios封 装 的 ajax请 求 函 数
函 数 返 回 的 是 promise对 象
*/
import axios from 'axios'


export default function ajax(url='',data={},type="GET"){
	if(type == "GET"){//发送get请求
		//拼串,得到请求地址
		let paramStr = '';
		//根据属性名分割数组拿到属性值
		Object.keys(data).forEach(key=>{
			paramStr += key+'='+data[key]+'&'
		})
		//如果存在得到最终的请求地址参数
		if(paramStr){
			paramStr = paramStr.substring(0, paramStr.length-1) 
		}
		return axios.get(url+'?'+paramStr)
	}else{//post
		return axios.post(url,data)
	}
}