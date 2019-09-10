import React,{Component} from 'react'
import { Switch,Route,Redirect } from 'react-router-dom'
import {NavBar} from 'antd-mobile'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { getRedirectTo } from '../../utils/index.js'
import { getUser } from '../../redux/actions.js'

import LaobanInfo from '../laoban-info/laoban-info.js'
import DashenInfo from '../dashen-info/dashen-info.js'
import Dashen from '../dashen/dashen.js' 
import Laoban from '../laoban/laoban.js'
import Message from '../message/message.js' 
import Personal from '../personal/pensonal.js' 
import NotFound from '../../components/not-found/not-found.js' 
import NavFooter from '../../components/footer/footer.js'

class Main extends Component {

	//给 组 件 对 象 添 加 属 性 
	navList = [ 
		{ 
			path: '/laoban', //路 由 路 径
			component: Laoban, 
			title: '大神列表', 
			icon: 'dashen', 
			text: '大神'
		}, 
		{ 
			path: '/dashen', //路 由 路 径
			component: Dashen, 
			title: '老板列表', 
			icon: 'laoban', 
			text: '老板'
		},
		{ 
			path: '/message', //路 由 路 径
			component: Message, 
			title: '消息列表', 
			icon: 'message', 
			text: '消息'
		},
		{ 
			path: '/personal', //路 由 路 径
			component: Personal, 
			title: '用户中心', 
			icon: 'personal', 
			text: '个人'
		}
	]


	componentDidMount(){
		const userid = Cookies.get('userid')
		const { _id } = this.props.user
		if(userid && !_id){
			//发送请求
			this.props.getUser()
		}
	}
	render() {
		//读取cookie中的userid
		const userid = Cookies.get('userid')
		//如果没有返回登陆界面
		if(!userid){
			return <Redirect to="/login"/>
		}
		//如果有查询redux中的user状态
		const { user } = this.props
		//如果user没有id,返回null
		if(!user._id){
			return null
		}else{//如果有根据type,header重定向路径
			let path = this.props.location.pathname
			if(path === '/'){
				path = getRedirectTo(user.type,user.header)
				return <Redirect to={ path }/>
			}
		}
		
		//检查用户是否登陆,返回定向路径
		// const {user} = this.props
		// if(!user._id){
		// 	return	<Redirect to="/login"/>
		// }

		const path = this.props.location.pathname//当前请求的路径
		//根据请求的路径匹配对应的数组数据
		const currentNav = this.navList.find(nav=>nav.path === path)
		//根据用户的类型显示相应的下标
		if(currentNav){
			//隐藏路由
			if(user.type === 'laoban'){
				this.navList[1].hide = true
			}else{
				this.navList[0].hide = true
			}
		}
		return (
			<div>
				{currentNav ? <NavBar style={{ backgroundColor:'#1DA57A'}} className="sticky-header">{currentNav.title}</NavBar> : null} 
				<Switch>
					<Route path="/laobaninfo" component={LaobanInfo} />
					<Route path="/dasheninfo" component={DashenInfo} />
					{
						this.navList.map(nav=> <Route path={nav.path} key={nav.path} component={nav.component} />)
					}
					<Route component={NotFound}></Route> 
				</Switch>
				{currentNav ? <NavFooter navList={this.navList}/> : null}
			</div>
		)
	}
}
export default connect( state => ({user:state.user}), {getUser} )(Main)