import React,{ Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import { actionCreator } from './store';
import { Breadcrumb, Table } from 'antd'
import Layout from 'common/layout';
import moment from 'moment'

const columns = [
      {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
      },
      {
          title: '是否管理员',
          dataIndex: 'isAdmin',
          key: 'isAdmin',
          render:(isAdmin)=>(isAdmin ? '是' : '否')
      },
      {
          title: 'email',
          dataIndex: 'email',
          key: 'email',
      },
      {
          title: '手机',
          dataIndex: 'phone',
          key: 'phone',
      },
      {
          title: '注册时间',
          dataIndex: 'createdAt',
          key: 'createdAt',
      },
  ]

class User extends Component{
    componentDidMount() {
        this.props.handlePage(1)
    }
    render(){
    	const { list,current,total,pageSize,handlePage,isFetching } = this.props;
      const dataSource = list.map((user)=>{
          return {
              key:user.get('_id'),
              username:user.get('username'),
              isAdmin:user.get('isAdmin'),
              phone:user.get('phone'),
              email:user.get('email'),
              createdAt:moment(user.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')
          }
      }).toJS()
    	return (<div className="User">
                <Layout>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                  <Breadcrumb.Item>用户列表</Breadcrumb.Item>
                  </Breadcrumb>
                <div className="content">
                  <Table 
                    dataSource={dataSource} 
                    columns={columns}
                    pagination={{
                        current:current,//当前页
                        total:total,//总数居
                        pageSize:pageSize//每页条数
                    }}
                    onChange={
                        (page)=>{
                            handlePage(page.current)
                        }
                    }
                    loading={
                      {
                        spinning:isFetching,
                        tip:"数据正在加载中"
                      }
                    }
                />                                           
                </div>
             </Layout>
    	</div>)
    }
}
//获取数据
const mapStateToProps = (state)=>{
    return {
    	list:state.get('user').get('list'),
      current:state.get('user').get('current'),
      total:state.get('user').get('total'),
      pageSize:state.get('user').get('pageSize'),
      isFetching:state.get('user').get('isFetching'),
    }    
}

//映射方法到组件,在组件中发送ajax
const mapDispatchToProps = (dispatch)=>({
	handlePage:(page)=>{
        dispatch(actionCreator.getPageAction(page))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(User)//拿到数据返回给组件