import React, {Component} from 'react';
import { NavItem, Nav, NavLink } from 'reactstrap';

class NavNav extends Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }
    
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    render(){

        return(
            <div>
                <Nav pills>
                    <NavItem>
                        <NavLink href="https://apiarydev-react-homepage.azurewebsites.net/"><span className="fa fa-home fa-lg"></span> Home </NavLink>
                    </NavItem>                    
                    
                </Nav>

            </div>
        );
    }
    
}
export default  NavNav;