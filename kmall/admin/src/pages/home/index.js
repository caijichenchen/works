import React,{ Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import { actionCreator } from './store';
import { Breadcrumb,Card,Row,Col } from 'antd';
import Layout from 'common/layout';

class Home extends Component{
	componentDidMount(){
		this.props.handleCount()
	}
  render(){
  	const { usernum,ordernum,productnum } = this.props;
  	return (<div className="Home">
              <Layout>
               <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item style={{ fontWeight:600 }}>首页</Breadcrumb.Item>
              </Breadcrumb>
              <div className="content">
                  <Row>
                    <Col span={8}>
                      <Card title="用户数" bordered={false} style={{ width: 300 }}>
                        <p>{usernum}</p>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card title="商品数" bordered={false} style={{ width: 300 }}>
                        <p>{productnum}</p>
                      </Card>                      
                    </Col>
                    <Col span={8}>
                      <Card title="订单数" bordered={false} style={{ width: 300 }}>
                        <p>{ordernum}</p>
                      </Card>  
                    </Col>
                  </Row>                                                        
              </div>
           </Layout>
  	</div>)
  } 
}
//获取数据
const mapStateToProps = (state)=>{
    return {
    	usernum:state.get('home').get('usernum'),
	    ordernum:state.get('home').get('ordernum'),
	    productnum:state.get('home').get('productnum'),   
    }    
}

//映射方法到组件,在组件中发送ajax
const mapDispatchToProps = (dispatch)=>({
	handleCount:()=>{
		dispatch(actionCreator.getCountAction())
	}
})

export default connect(mapStateToProps,mapDispatchToProps)(Home)//拿到数据返回给组件