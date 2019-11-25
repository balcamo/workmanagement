import React, {Component, useState } from 'react';
import fetch from 'isomorphic-fetch';
import { Input } from 'reactstrap';
import { watchFile } from 'fs';


class WorkOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
          baseURL:'https://apiarydev-ispringbrook.azurewebsites.net/api/workorder/',
          selectedState: 'Status options',
          setState:false,
          workOrderNums:[],
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
      handleNewStat(newStatus){
        setTimeout(() => {
            this.setState({selectedState:newStatus});
            console.log('in wait '+this.state.selectedState);
            this.ChangeInStatus();
        }, 1000);
        
        
      }
      ChangeInStatus(){
        console.log('in change function '+this.state.selectedState);
        fetch(this.state.baseURL+this.state.selectedState, {
            method:"GET"
        }).then(function(response) {
            if (response.ok) {
            return response
            } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
            }
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            //var tempArr = data;
            //tempArr.sort(function(a, b){return a - b});
            this.setState({ workOrderNums: data })
            })
            .catch(console.log);
        console.log(this.state.workOrderNums);
        
      }
      render(){
        return (
            <div>
                <header >
                    <h1>Work Orders</h1>
                </header>
                <div>
                    <Input type="select" value={this.state.selectedState} onChange={(e)=> this.handleNewStat(e.target.value)} >
                        <option value='Status options'>Status options</option>
                        <option value='New'>New</option>
                        <option value='Not Started'>Not Started</option>
                        <option value='In Progress'>In Progress</option>
                        <option value='Completed'>Completed</option>
                        <option value='Closed'>Closed</option>
                        <option value='Void'>Void</option>

                    </Input>
                </div>
                <div>

                </div>
            </div>
        )
      }
}
export default WorkOrders;