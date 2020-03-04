import React, { Component } from 'react';
import { Navbar } from 'reactstrap';
import { BrowserRouter,Switch, Route,withRouter } from 'react-router-dom';
import NavNav from './nav';
import WorkOrders from './WorkOrders';
import Home from './Home';
//import { actions } from 'react-redux-form';
//import { TransitionGroup, CSSTransition } from 'react-transition-group';


class Main extends Component{


    
    render(){
        return(
            <div className="container">
                <Navbar light>
                    <NavNav/>
                </Navbar>
                <BrowserRouter>
                    <Switch>
                        <Route path="/WorkOrders" component={WorkOrders} />
                        <Route path="/" render={Home} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default withRouter(Main);