import React, {Component} from 'react'
import {List, Grid} from 'antd-mobile'


export default class HeaderSelector extends Component {
	constructor(props){
		super(props)
		//准备需要显示的列表数据
		this.headerList = []
		for(let i = 0;i<20;i++){
			this.headerList.push({
				text:"头像"+(i+1),
				icon:require(`../../assets/headers/头像${i+1}.png`)
			})
		}
	}

	state = {
		icon:null,//头像图片对象
	}

	handleChange=({text,icon})=>{
		//更新头像状态
		this.setState({icon})
		//更新父组件头像信息数据
		this.props.setHeader(text)
	}

	render(){
		const { icon } = this.state
		const headermsg = !icon ? "请选择头像" : (
			<div>已选择头像:<img src={icon}/></div>
			)
		return(
			<List  renderHeader={() => headermsg}>
				<Grid data={this.headerList} columnNum={5} onClick={this.handleChange}/> 
			</List>
		)
	}
}