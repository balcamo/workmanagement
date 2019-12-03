import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
//import Autocomplete from './Autocomplete';

class WorkOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
          baseURL:'https://apiarydev-ispringbrook.azurewebsites.net/api/workorder/',
          selectedState: 'Status options',
          setState:false,
          workOrderNums:[],
          orderFrom:'',
          orderTo:'',
          dropdownOpen:false,
          setDropdownOpen:false,
          isHidden:true,
        };
        this.toggleDropDown = this.toggleDropDown.bind(this);

      }
    toggleDropDown(){
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }
    getData(){
        setTimeout(() => {
          fetch(this.state.baseURL, {
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
                
                //this.setState({ workOrderNums:tempArr });
                
                 var tempArr =  data[0].value;
                 tempArr.map(val=>this.state.workOrderNums.push(val.toString()));
                 this.setState({ workOrderNums: tempArr });
                 console.log("state var "+this.state.workOrderNums);
              })
              .catch(console.log);
        }, 200)
      }
    //get the data on load
    componentDidMount(){
        this.getData();
    }
    
    GetWorkOrders(){
        var temp=[this.state.orderFrom,this.state.orderTo,this.state.selectedState];
        console.log('in change function '+this.state.selectedState);
        fetch(this.state.baseURL+this.state.selectedState, {
            method:"POST",
            body:{temp},
        }).then(function(response) {
            if (response.ok) {
            return response
            } else {
                this.setState({isHidden:false});
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
            }
        })
        .then(res => res.json())
        .then((data) => {

            this.setState({isHidden:false});
            })
            .catch(console.log);
    }
    render(){
        const Child = (
            <p>this will be the table displaying WorkOrders</p>
        );
        return (
            <div>
                <header >
                    <h1>Work Orders</h1>
                </header>
                <Form>
                    <FormGroup>
                        <Input type="select" value={this.state.selectedState} onChange={(e)=> this.setState({selectedState:e.target.value})} >
                            <option value='Status options'>Status options</option>
                            <option value='New'>New</option>
                            <option value='Not Started'>Not Started</option>
                            <option value='In Progress'>In Progress</option>
                            <option value='Completed'>Completed</option>
                            <option value='Closed'>Closed</option>
                            <option value='Void'>Void</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="FromOrder">Start</Label>
                        <Input id="FromOrder" type="text" onChange={(e)=> this.setState({orderFrom:e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="ToOrder">End</Label>
                        <Input id="ToOrder" type="text" onChange={(e)=> this.setState({orderTo:e.target.value})}/>
                    </FormGroup>
                    <Button type="submit" onClick={this.GetWorkOrders}>Submit</Button>
                </Form>
                <div>
                    {!this.state.isHidden &&  (<Child/>)}
                </div>
            </div>
        )
    }
}
export default WorkOrders;