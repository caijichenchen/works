import React, { Component } from 'react'
import { Layout, Menu, Icon, Dropdown } from 'antd'
import axios from 'axios';
import { getUsername,removeUsername } from 'util';
const { Header } = Layout;
import api from 'api';

import "./index.css"

class AdminHeader extends Component {
    handleLogout(){
      api.logout()
        .then(result=>{
            if(result.code == 0){
                removeUsername();
                window.location.href = '/login'
            }
        })
    }
    render() {
        const menu = (
          <Menu onClick={this.handleLogout.bind(this)}>
            <Menu.Item key="1">
                <Icon type="logout" /> 退出
            </Menu.Item>
          </Menu>
        )     
        return (
            <div className="AdminHeader">
                <Header className="header">
                  <div className="logo">
                    KMALL
                  </div>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                          {getUsername()} <Icon type="down" />
                        </a>
                    </Dropdown>
                </Header>
            </div>
        );
    }
}

export default AdminHeader