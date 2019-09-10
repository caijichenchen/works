import React, {Component} from 'react' 
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
const Item = TabBar.Item

class Footer extends Component {
	render(){
		let { navList } = this.props
		navList = navList.filter(nav => !nav.hide)
		const {pathname} = this.props.location 
		return (
			<TabBar>
				{
					navList.map((nav,index)=>(
						<Item 
							key={nav.path}
							title={nav.text}
							icon={{uri: require(`../../assets/footer/${nav.icon}.png`)}}
							selectedIcon={{uri: require(`../../assets/footer/${nav.icon}-selected.png`)}}
							selected={pathname===nav.path} 
							onPress={() => { 
								this.props.history.replace(nav.path) 
							}}
						/>

					))
				}
			</TabBar>
		)
	}
}

export default withRouter(Footer) //让 非 路 由 组 件 可 以 访 问 到 路 由 组 件 的 API

