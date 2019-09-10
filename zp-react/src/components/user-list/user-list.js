import React, {Component} from 'react' 
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
const Header = Card.Header 
const Body = Card.Body

class UserList extends Component {
	render(){
		const { userList } = this.props
		return (
			<WingBlank style={{marginBottom:50,marginTop:50}}> 
				{
					userList.map(user => (
						<div key={user._id}> 
							<WhiteSpace/> 
							<Card onClick={()=>this.props.history.push(`/chat/${user._id}`)}> 
								<Header 
									thumb={require(`../../assets/headers/${user.header}.png`)} 
									extra={user.username}
								/> 
								<Body> 
									<div>职位: {user.post}</div> 
									{user.company ? <div>公司: {user.company}</div> : null} 
									{user.salary ? <div>月薪: {user.salary}</div> : null} 
									<div>描述: {user.info}</div> 
								</Body> 
							</Card> 
						</div> 
					))
				}
			</WingBlank>
		)
	}
}

export default withRouter(UserList) //让 非 路 由 组 件 可 以 访 问 到 路 由 组 件 的 API
