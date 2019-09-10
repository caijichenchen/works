import React, {Component} from 'react' 
import { connect } from 'react-redux'
import {NavBar, InputItem,Button} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector.js'
import { updateUser } from '../../redux/actions.js'
import { Redirect } from 'react-router-dom'


class DashenInfo extends Component {
	state = {
		header: '', //头 像 名 称
		info: '', //职 位 简 介
		post: '', //职 位 名 称 
	}
	//设 置 更 新 header 
	setHeader = (header) => { 
		this.setState({header}) 
	}

	handleChange = (name,val) =>{
		this.setState({
			[name]:val
		})
	}
	save = () =>{
		//发送请求派发action
		this.props.updateUser(this.state)
	}
	render(){
		const { header,type } = this.props.user
		if(header){//更新信息完成
			const path = type === 'dashen' ? '/dashen' : '/laoban'//返回的路径
			return <Redirect to={path} />
		}
		return (
			<div>
				<NavBar style={{ backgroundColor:'#1DA57A'}}>大神信息完善</NavBar> 
				<HeaderSelector setHeader={this.setHeader}/>
				<InputItem placeholder="请输入求职岗位" onChange={val=>this.handleChange('post',val)}>求职岗位:</InputItem> 
				<InputItem placeholder="请输入个人介绍" onChange={val=>this.handleChange('info',val)}>个人介绍:</InputItem> 
 				<Button type='primary' style={{ backgroundColor:'#1DA57A'}}
 						onClick={this.save}
 				>保存 </Button>
			</div>
		)
	}
}

export default connect( 
	state => ({user:state.user}), 
	{updateUser} 
 )(DashenInfo)