import React, {Component} from 'react' 
import { connect } from 'react-redux'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector.js'
import { updateUser } from '../../redux/actions.js'
import { Redirect } from 'react-router-dom'

class LaobanInfo extends Component {
	state = {
		header: '', //头 像 名 称
		info: '', //职 位 简 介
		post: '', //职 位 名 称 
		company: '', // 公 司 名 称 
		salary: '' // 工 资
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
				<NavBar style={{ backgroundColor:'#1DA57A'}}>老板信息完善</NavBar> 
				<HeaderSelector setHeader={this.setHeader}/>
				<InputItem placeholder="请输入招聘职位" onChange={val=>this.handleChange('post',val)}>招聘职位:</InputItem> 
				<InputItem placeholder="请输入公司名称" onChange={val=>this.handleChange('company',val)}>公司名称:</InputItem> 
				<InputItem placeholder="请输入职位薪资" onChange={val=>this.handleChange('salary',val)}>职位薪资:</InputItem>
				<TextareaItem title="职位要求:" rows={3} onChange={val=>this.handleChange('info',val)}/>
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
)(LaobanInfo)