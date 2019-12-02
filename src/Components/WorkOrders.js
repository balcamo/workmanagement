import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Input } from 'reactstrap';
import Autocomplete from 'react-autocomplete';

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
          setDropdownOpen:false,
          isHidden:true,
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
            var tempArr = data[0].value;
            tempArr.map(val=>this.state.workOrderNums.push(val));
            //this.setState({ workOrderNums:tempArr });
            console.log("state var "+this.state.workOrderNums);
            this.setState({isHidden:false});
            })
            .catch(console.log);
    }
    render(){
        const Child = (
            <div>
               <Autocomplete
                    getItemValue={(item) => item}
                    items={this.state.workOrderNums}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item}
                        </div>
                    }
                    onChange={(e) => this.setState({orderFrom:e.target.value})}
                />
            </div>
        );
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
                    {!this.state.isHidden &&  (<Child/>)}
                </div>
            </div>
        )
    }
}
export default WorkOrders;