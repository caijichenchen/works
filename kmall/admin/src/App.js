import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch,Redirect } from "react-router-dom";
import "./index.css";

import Home from 'pages/home';
import Login from 'pages/login';
import Err from 'common/err';
import User from 'pages/user';
import Category from 'pages/category';
import Product from 'pages/product';
import Ad from 'pages/ad'
import Order from 'pages/order'

import { getUsername } from 'util';

class App extends Component {
    render() {
        //自定义路由,获取用户信息,如果没有跳转到登陆页面
        const ProtectRoute = ({component:Component,...rest})=>(
            <Route
                {...rest}
                render={(props)=>{
                    return getUsername() ? <Component {...props}/> : <Redirect to="/login" />
                }}
            />
            )
        //自定义路由,如果获取到用户信息跳转到管理页面
        const LoginRoute = ({component:Component,...rest})=>(
            <Route 
            {...rest}
            render={(props)=>{
                return getUsername() ? <Redirect to="/" /> : <Component {...props} />
            }}
        />)
        return (
            <Router forceRefresh={true}>
	            <div className="App">
                    <Switch>
                        <ProtectRoute exact path="/" component={Home} />
                        <ProtectRoute path="/user" component={User} />
                        <ProtectRoute path="/category" component={Category} />
                        <ProtectRoute path="/product" component={Product} />
    	            	<LoginRoute path="/login" component={Login} />
                        <ProtectRoute  path="/ad" component={Ad}  />
                        <ProtectRoute  path="/order" component={Order}  />
                        <Route component={Err} />
                    </Switch>
            	</div>
            </Router>
        )          
    }
}

export default App