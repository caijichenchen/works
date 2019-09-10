import * as types from './actionTypes.js'
import { fromJS } from 'immutable'

const defaultState = fromJS({
    isFetching:false,
    list:[],
    current:0,
    total:0,
    pageSize:0, 
    keyword:'',

    order:{},
    orderNo:'',
})
export default (state=defaultState,action)=>{
    if(action.type === types.SET_PAGE){
        return state.merge({
            current:action.payload.current,
            total:action.payload.total,
            pageSize:action.payload.pageSize,
            list:fromJS(action.payload.list),
            keyword:action.payload.keyword || '',
        })      
    }
    if(action.type === types.PAGE_REQUEST){
        return state.set('isFetching',true)
    }

    if(action.type === types.PAGE_DONE){
        return state.set('isFetching',false)
    }
    if(action.type === types.SET_ORDER_DETAIL){
        return state.set('order',action.payload)
    }                                                   
    return state;
}