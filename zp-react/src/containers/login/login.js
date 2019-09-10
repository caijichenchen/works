/* 用 户 登 陆 的 路 由 组 件 */
import React, {Component} from 'react' 
import { NavBar, WingBlank, List, InputItem, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import Logo from '../../components/logo/logo.js'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/actions.js'


class Login extends Component { 
	state = { 
		username: '', 
		password: '', 
	}
	//处 理 输 入 框 / 单 选 框 变 化 ,收 集 数 据 到 state
	handleChange = (name, value) => { 
		this.setState({
			[name]: value
		}) 
	}
	//跳 转 到 注 册 路 由 
	toRegister = () => { 
		this.props.history.replace('/register') 
	}
	//登陆
	login = () => { 
		this.props.login(this.state)
	}
	render() { 
		const {msg,redirectTo} = this.props
		if(redirectTo){
			return <Redirect to={redirectTo} />
		}
		return ( 
			<div> 
				<NavBar style={{ backgroundColor:'#1DA57A'}}>硅谷直聘</NavBar> 
				<Logo/> 
				{msg ? <div className="error-msg">{msg}</div> : null}
				<WingBlank> 
				<List> 
					<InputItem placeholder='输入用户名' onChange={val => this.handleChange('username', val)} > 用户名: </InputItem> 
					<WhiteSpace/> 
					<InputItem type='password' placeholder='输入密码' onChange={val => this.handleChange('password', val)} > 密&nbsp;&nbsp;&nbsp;码: </InputItem> 
					<WhiteSpace/> 
					<Button type='primary' onClick={this.login} style={{ backgroundColor:'#1DA57A'}}>登&nbsp;&nbsp;&nbsp;陆 </Button> 
					<WhiteSpace/> 
					<Button onClick={this.toRegister}>还没有账号</Button> 
				</List> 
				</WingBlank> 
			</div> 
		) 
	} 
}

export default connect( state => state.user, {login} )(Login)