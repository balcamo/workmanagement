import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Button, Form, FormGroup, Input, Label, Table } from 'reactstrap';
//import Autocomplete from './Autocomplete';

class WorkOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
          baseURL:'https://apiarydev-ispringbrook.azurewebsites.net/api/workorder',
          selectedState: 'Status options',
          setState:false,
          workOrderNums:[],
          orderFrom:"",
          orderTo:"",
          dropdownOpen:false,
          setDropdownOpen:false,
          isHidden:true,
          returnedWorkOrders:[]
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
       // this.getData();
    }
    
    GetWorkOrders=(event) =>{
        var temp=JSON.stringify([this.state.orderFrom.toString(),this.state.orderTo.toString(),this.state.selectedState]);
        console.log('in change function '+this.state.selectedState);
        
        fetch(this.state.baseURL, {
            method:"POST",
            body:temp,
            headers:{
                'Content-Type': 'application/json'
            }
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
            if(data.length===0){
                this.setState({returnedWorkOrders:[],orderFrom:'',
                    orderTo:'',selectedState:'Status options'})
                alert("There are no work orders in that range for the given status.\nPlease try again with different values.")

            }else{
                var tempdata=data;
                
                tempdata.map(val=>this.state.returnedWorkOrders.push(val.value));
                this.setState({returnedWorkOrders:this.state.returnedWorkOrders,
                    orderFrom:"",orderTo:"",selectedState:'Status options'})

                console.log(this.state.returnedWorkOrders);
            }
            })
            .catch(console.log);
        
        event.preventDefault();
    }
    render(){
        const Child = (
            <p>this will be the table displaying WorkOrders</p>
        );
        const workForms = this.state.returnedWorkOrders.map((item)=>
            <tr key={item.woNumber}>
                <td>{item.woNumber}</td>
                <td>{item.creator}</td>
                <td>{item.priority}</td>
                <td>{item.description}</td>
            </tr>
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
                        <Input id="FromOrder" type="text" value={this.state.orderFrom} onChange={(e)=> this.setState({orderFrom:e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="ToOrder">End</Label>
                        <Input id="ToOrder" type="text" value={this.state.orderTo} onChange={(e)=> this.setState({orderTo:e.target.value})}/>
                    </FormGroup>
                    <Button type="submit" onClick={(e)=>this.GetWorkOrders(e)}>Get Work Orders</Button>
                    <Button type="submit" onClick={(e)=>this.printWO(e)}>Print</Button>
                </Form>
                <div>
                    <h4>Work Orders</h4>
                        <Table bordered dark hover>
                            <thead>
                                <tr>
                                    <td>W.O. Number</td>
                                    <td>Creator</td>
                                    <td>Priority</td>
                                    <td>Description</td>
                                </tr>
                            </thead>
                            <tbody>
                                {workForms}
                            </tbody>
                        </Table>
                </div>
            </div>
        )
    }
}
export default WorkOrders;