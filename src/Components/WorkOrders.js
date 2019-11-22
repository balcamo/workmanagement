import React, {Component, useState } from 'react';
import fetch from 'isomorphic-fetch';
import { InputGroupButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class WorkOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedState: null,
          setState:false,
          orderFrom:Number,
          orderTo:Number,
          dropdownOpen:false,
          setDropdownOpen:false
        };
        this.toggleDropDown = this.toggleDropDown.bind(this);

      }
      toggleDropDown(){
          this.setState({dropdownOpen: !this.state.dropdownOpen});
      }
      ChangeinState(){
          //fetch for workorder numbers
          console.log(this.state.selectedState);
      }
      render(){
        return (
            <div>
                <header >
                    <h1>Work Orders</h1>
                </header>
                <div>
                    <InputGroupButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown} value={this.state.selectedState} onChange={(e)=> this.setState({ selectedState: e.target.value }), this.ChangeinState()}>
                        <DropdownToggle caret>
                            Button Dropdown
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header value="null">Status options</DropdownItem>
                            <DropdownItem value="new">New</DropdownItem>
                            <DropdownItem value="not started">Not Started</DropdownItem>
                            <DropdownItem value="in progress" > In Progress</DropdownItem>
                            <DropdownItem value="completed" > Completed</DropdownItem>
                            <DropdownItem value="closed">Closed</DropdownItem>
                            <DropdownItem value="void">Void</DropdownItem>
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                </div>
                <div>

                </div>
            </div>
        )
      }
}
export default WorkOrders;