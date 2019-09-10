import axios from 'axios';
import { removeUsername } from 'util';

import { SERVER,API_CONFIG } from './config.js'

const getApiObj = (apiConfig)=>{
    const apiObj = {};
    //遍历数据,拿到对应方法上的参数
    for(let key in apiConfig){
        apiObj[key] = (data)=>{
            //处理请求参数
            let url = apiConfig[key][0] || '';
            url = SERVER + url;
            let method = apiConfig[key][1] || 'get';
            return request(url,method,data)
        }
    }

    return apiObj
}

const request = (url,method,data)=>{
    return new Promise((resolve,reject)=>{
        const options = {
            method: method,
            url:url,
            withCredentials:true,
        }
        switch(options.method.toUpperCase()){
            case 'GET':
            case 'DELETE':
                options.params = data
                break
            default:
                options.data = data
        }
        axios(options)
        .then(result=>{
            const data  = result.data;
            if(result.code == 10){
            	removeUsername();
            	window.location.href = "/login";
            	reject("用户没有权限")
            }
            resolve(data)
        })
        .catch(err=>{
            reject(err)
        })
    })
}


export default getApiObj(API_CONFIG)