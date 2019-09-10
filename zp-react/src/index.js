import React from 'react' 
import ReactDOM from 'react-dom' 
import {Provider} from 'react-redux'
import store from './redux/store'
import {HashRouter, Switch, Route} from 'react-router-dom'

import Login from './containers/login/login' 
import Register from './containers/register/register' 
import Main from './containers/main/main'
import Chat from './containers/chat/chat.js'

import './assets/css/index.less'

import './test/socketio_test.js'

ReactDOM.render(( 
	<Provider store={store}> 
		<HashRouter> 
			<Switch> 
				<Route path='/login' component={Login}/> 
				<Route path='/register' component={Register}/> 
				<Route path='/chat/:userid' component={Chat}/> 
				<Route component={Main}/> 
			</Switch> 
		</HashRouter> 
	</Provider>
	), document.getElementById('root'))
