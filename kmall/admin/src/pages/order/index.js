import React, { Component } from 'react'
import { 
    Route, 
    Switch,
} from "react-router-dom"

import OrderList from './list.js'
import OrderDetail from './detail.js'



class Order extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
           <Switch>
                <Route path="/order/detail/:orderNo?" component={OrderDetail} />
                <Route path="/order/" component={OrderList} />
           </Switch> 
        )
    }
}


export default Order