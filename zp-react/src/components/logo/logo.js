import React,{Component} from 'react'
import logo from './logo.png' 
import './logo.less' 
/* 简 单 的 显 示 logo 的 组 件 */ 
export default class Logo extends Component { 
	render () { 
		return ( 
			<div className="logo-container"> 
				<img src={logo} alt="logo" className='logo-img'/> 
			</div> 
		) 
	} 
}