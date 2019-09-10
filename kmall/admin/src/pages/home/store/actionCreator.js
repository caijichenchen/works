import * as types from './actionTypes.js';
import axios from 'axios';
import { message } from 'antd';
import api from 'api';

const getSetCountAction = (payload)=>({
    type:types.SET_COUNT,
    payload 
})

export const getCountAction = ()=>{
    return (dispatch,getState)=>{
        api.getCounts()
        .then(result=>{
            if(result.code == 0){
            	dispatch(getSetCountAction(result.data))
            }else{
                message.error(result.message);
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试');
        })     
    }
}