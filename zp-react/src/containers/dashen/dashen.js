import React, {Component} from 'react' 
import { connect } from 'react-redux'
import UserList from '../../components/user-list/user-list.js'
import { getUserList } from '../../redux/actions.js'

class Dashen extends Component {

	componentDidMount(){
		//获取用户列表信息
		this.props.getUserList('laoban')
	}

	render(){
		return (
			<UserList userList={this.props.userList}/>
		)
	}
}

export default connect( 
	state => ({userList:state.userList}), 
	{getUserList} 
 )(Dashen)