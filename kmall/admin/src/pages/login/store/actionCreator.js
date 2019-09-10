import * as types from './actionTypes.js';
import axios from 'axios';
import api from 'api';
import { message } from 'antd';
import { saveUsername } from 'util';

const getLoginRequestStartAction = ()=>({
    type:types.LOGIN_REQEST_START  
})

const getLoginRequestDoneAction = ()=>({
    type:types.LOGIN_REQEST_DONE   
})

export const getLoginAction = (values)=>{
    return (dispatch,getState)=>{
        //改变登录按钮状态防止多次点击
        dispatch(getLoginRequestStartAction());
        values.role = 'admin';
        api.login(values)//发送服务器请求获取用户信息用户名
        .then(result=>{
            if(result.code == 0){
                //1.在前端保存用户状态信息
                saveUsername(result.data.username);
                //2.跳转到后台首页
                window.location.href = "/";
            }else{
                message.error(result.message);
            }
        })
        .catch(err=>{
            console.log(err);
            message.error('网络错误,请稍后再试');
        })   
        .finally(()=>{
            //请求发送结束改变登陆按钮状态
            dispatch(getLoginRequestDoneAction());
        })    
    }
}