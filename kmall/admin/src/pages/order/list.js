import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb, Table,Button,Input,InputNumber,Switch,Divider } from 'antd'

import moment from 'moment'
import { 
    Link,

} from "react-router-dom"
import Layout from 'common/layout'

import { actionCreator } from './store'
const { Search } = Input


class ProductList extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.handlePage(1)
    }    
    render() {
        const { 
            list,
            current,
            total,
            pageSize,
            handlePage,
            isFetching,
            keyword,
            orderNo
        } = this.props
        const columns = [{
                title: '订单号',
                dataIndex: 'orderNo',
                key: 'orderNo',
                render:(name)=>{
                    if(keyword){
                        const reg = new RegExp('('+keyword+')','ig')
                        const html =  name.replace(reg,'<b style="color:red;">$1</b>')
                        return <span dangerouslySetInnerHTML={{__html:html}} ></span>
                    }else{
                        return name
                    }
                }
            },
            {
                title: '订单状态',
                dataIndex: 'statusDesc',
                key: 'statusDesc',
            },
            {
                title: '收货人',
                dataIndex: 'shipping.name',
                key: 'shipping.name',
            },
            {
                title: '支付方式',
                dataIndex: 'paymentTypeDesc',
                key: 'paymentTypeDesc',
            },                        
            {
                title: '订单时间',
                dataIndex: 'createdAt',
                key: 'createdAt',                 
            },
            {
                title:'操作',
                render:(text,record)=>{
                    return (<span>
                        <Link to={"/order/detail/"+record.orderNo}>查看</Link>
                    </span>)
                }    
            }
        ]        
        const dataSource = list.toJS()      
        return (
            <div className="User">
             <Layout>
                 <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>首页</Breadcrumb.Item>
                  <Breadcrumb.Item>订单管理</Breadcrumb.Item>
                  <Breadcrumb.Item>订单列表</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{marginBottom:16,height:40}} className='claerfix'>
                    <Search 
                        placeholder="请输入订单名称关键字" 
                        onSearch={
                            value => handlePage(1,value)
                        } 
                        enterButton 
                        style={{ width: 300 }}
                    />
                </div>
                <div className="content">
                    <Table 
                        dataSource={dataSource} 
                        columns={columns}
                        pagination={{
                            current:current,
                            total:total,
                            pageSize:pageSize
                        }}
                        onChange={
                            (page)=>{
                                handlePage(page.current,keyword)
                            }
                        }
                        loading={
                            {
                                spinning:isFetching,
                                tip:'数据正在努力的加载中'
                            }
                        }
                    />                                   
                </div>
             </Layout>
        </div>
        );
    }
}

//映射属性到组件
const mapStateToProps = (state) => ({
    list:state.get('order').get('list'),
    current:state.get('order').get('current'),
    total:state.get('order').get('total'),
    pageSize:state.get('order').get('pageSize'), 
    isFetching:state.get('order').get('isFetching'), 
    keyword: state.get('order').get('keyword'),
    orderNo:state.get('order').get('orderNo')
})
//映射方法到组件
const mapDispatchToProps = (dispatch) =>({
    handlePage:(page,keyword)=>{
        dispatch(actionCreator.getPageAction(page,keyword))
    },               
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)