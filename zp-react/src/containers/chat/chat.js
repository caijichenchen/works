import React, {Component} from 'react' 
import { connect } from 'react-redux'
import {NavBar, List, InputItem,Grid,Icon} from 'antd-mobile'
import { sendMsg } from '../../redux/actions.js'
const Item = List.Item


class Chat extends Component { 

	state = {
		content:'',
		isShow:false
	}

	//第一次render之前
	componentWillMount(){
		//初始化表情
		const emojis = [
			'😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
	      	,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
	      	,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
	      	,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
	      	]
    	this.emojis = emojis.map(emoji => ({text: emoji}))
	}
	componentDidMount() {
	   // 初始显示列表
	   window.scrollTo(0, document.body.scrollHeight)

	}

	componentDidUpdate () {
	   // 更新显示列表
	   window.scrollTo(0, document.body.scrollHeight)
	}

	handleSend = () => {
		const from = this.props.user._id//发送id
		console.log("from",from);
		const to = this.props.match.params.userid//接收id
		const content = this.state.content.trim()
		//发送消息
		if(content){
			this.props.sendMsg({from,to,content})
		}
		this.setState({
			content:'',
			isShow:false
		})
	}

	toggleShow = () => {
	    const isShow = !this.state.isShow
	    this.setState({isShow})
	    if(isShow) {
	      // 异步手动派发resize事件,解决表情列表显示的bug
	      setTimeout(() => {
	        window.dispatchEvent(new Event('resize'))
	      }, 0)
	    }
	  }

	render() { 
		const {user} = this.props
		console.log("user",user);
		const {users,chatMsgs} = this.props.chat//所有用户和当前用户的聊天信息
		//计算当前聊天的id
		const meId = user._id
		// console.log("meid",meId);
		if(!users[meId]){//如果没有获取数据不做任何显示
			return null
		}
		const targetId = this.props.match.params.userid
		const chatId = [meId,targetId].sort().join('_')

		//过滤聊天信息
		const msgs = chatMsgs.filter(msg=>msg.chat_id === chatId)
		//得到目标用户的头像
		const targetHeader = users[targetId].header
		const targetIcon = targetHeader ? require(`../../assets/headers/${targetHeader}.png`) : null

		return ( 
			<div id='chat-page'> 
				<NavBar 
					icon={<Icon type='left'/>}
					className='sticky-header'
					style={{ backgroundColor:'#1DA57A'}}
					onLeftClick={()=> this.props.history.goBack()}
				>
					{users[targetId].username}
				</NavBar> 
				<List style={{marginTop:50, marginBottom: 50}}> 
					{
						msgs.map(msg=>{
							if(meId === msg.from){
								return (
									<Item className='chat-me' key={msg._id} extra='我' > {msg.content} </Item>
								)
							}else{
								return (
									<Item thumb={targetIcon} key={msg._id} > {msg.content} </Item> 
								)
							}
						})
					} 
				</List>
				<div className='am-tab-bar'> 
					<InputItem 	
						placeholder="请输入" 
						value = {this.state.content}
						onChange={
							val=>this.setState({content:val})
						}
						extra={ 
							<span>
								<span onClick={this.toggleShow} style={{marginRight:5}}>😊</span>
								<span onClick={this.handleSend}>发送</span> 
							</span>
						} 
					/> 
					{this.state.isShow ? (
			            <Grid
			              data={this.emojis}
			              columnNum={8}
			              carouselMaxRow={4}
			              isCarousel={true}
			              onClick={(item) => {
			                this.setState({content: this.state.content + item.text})
			              }}
			            />
			          ) : null}
				</div> 
			</div>
		) 
	} 
}

export default connect( state => ({user:state.user,chat:state.chat}), {sendMsg} )(Chat)