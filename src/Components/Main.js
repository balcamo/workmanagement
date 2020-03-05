import React, { Component } from 'react';
import { Navbar } from 'reactstrap';
import { BrowserRouter,Switch, Route,withRouter } from 'react-router-dom';
import NavNav from './nav';
import WorkOrders from './WorkOrders';
import Home from './Home';


class Main extends Component{


    
    render(){
        return(
            <div className="container">
                <Navbar light>
                    <NavNav/>
                </Navbar>
                <BrowserRouter>
                    <Switch>
                        <Route path="/workOrders" component={WorkOrders} />
                        <Route path="/" render={Home} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default withRouter(Main);