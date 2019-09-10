import React,{ Component,Fragment } from 'react';
import { connect } from 'react-redux';
import './index.css';
import { Form, Icon, Input, Button } from 'antd';
import { actionCreator } from './store';

class Login extends Component{
    handleSubmit(ev){
		ev.preventDefault();
		this.props.form.validateFields((err, values) => {
	      if (!err) {
	        this.props.handleLogin(values);
	      }
	    });
	};
	//自定义校验密码
	validator(rules,value,callback){
		if(!value){
			callback("密码必须输入");
		}
		else if(value.length<4){
			callback("密码最低4位");
		}
		else if(value.length>12){
			callback("密码最多12位");
		}
		else if(!/^[a-zA-Z0-9_]+$/.test(value)){
			callback("密码必须是英文,数字,下划线");
		}
		else{
			callback();
		}
	}
    render(){
    	//拿到传递过来的form对象
		const form = this.props.form;
		const { getFieldDecorator } = form;
		return (
	            <div className="Login">
					<Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
				        <Form.Item>
				        	{
				        		getFieldDecorator('username',{
				        			rules: [
				        				{ required: true, whitespace:true, message: '用户名必须输入' },
				        				{ min: 4, message: '用户名最低4位' },
				        				{ max: 12, message: '用户名最多12位' },
				        				{ pattern: /^[a-zA-Z0-9_]+$/, message: '必须是英文,数字,下划线' }
				        			],
				        		})(
				        		<Input
					              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
					              placeholder="用户名"
					            />)
				        	}
				        	
				        </Form.Item>
				        <Form.Item>
					        {
					        	getFieldDecorator('password',{
					        		rules: [
					        			{
					        				validator:this.validator.bind(this)
					        			}
					        		]
					        	})(
					        		<Input
						              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
						              type="password"
						              placeholder="密码"
						            />)
					        }
				        </Form.Item>
				        <Form.Item>
				          <Button type="primary" htmlType="submit" loading={this.props.isFetching} className="login-form-button">
				            登陆
				          </Button>
				        </Form.Item>
				      </Form>
		        </div>
	        )
    }
}
const WrappedLoginForm = Form.create({ name: 'normal_login' })(Login);

const mapStateToProps = (state)=>{
     return {
     	isFetching: state.get('login').get('isFetching')
     }    
}

//映射方法到组件
const mapDispatchToProps = (dispatch)=>({
	//传递登陆数据
   handleLogin:(values)=>{
   	dispatch(actionCreator.getLoginAction(values))
   }
})

export default connect(mapStateToProps,mapDispatchToProps)(WrappedLoginForm)//拿到数据返回给组件