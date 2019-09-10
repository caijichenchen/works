/* 
redux最 核 心 的 store对 象 模 块
*/
import {createStore, applyMiddleware} from 'redux' 
import thunk from 'redux-thunk' 
import {composeWithDevTools} from 'redux-devtools-extension' 
import reducers from './reducers'


export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
