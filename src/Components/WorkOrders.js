import React, { Component,Fragment } from 'react';
import fetch from 'isomorphic-fetch';
import jsreport from 'jsreport-browser-client-dist';
import { Button, Form, FormGroup, Input, Label, Table,
     Breadcrumb, BreadcrumbItem } from 'reactstrap';
import LoadingSpinner from './LoadingSpinner';
import * as urls from '../urlsConfig';

class WorkOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
          baseURL:urls.springbrook+'workorder',
          selectedState: 'In Progress',
          //setState:false,
          orderFrom:"",
          orderTo:"",
          dropdownOpen:false,
          returnedWorkOrders:[],
          loading: false,
          newWO:[],
          disabled:true
        };
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.GetWorkOrders = this.GetWorkOrders.bind(this);
        this.PrintWorkOrders = this.PrintWorkOrders.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);

      }
    toggleLoading(){
        this.setState({loading:!this.state.loading})
    }
    toggleDropDown(){
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }
   
    componentDidMount(){
    }
    /**
     * 
     * @param {the event of pushing a button to prevent the reload} e 
     * this function will take the state variables selectedState, orderFrom, 
     * and orderTo and make a call to the springbrook interface to retrieve 
     * the workorders in the desired range with the gien status
     */
    GetWorkOrders(e) {
        e.preventDefault();
        if(this.state.orderFrom =="" || this.state.orderTo==""){
            alert("There are no work orders in that range for the given status.\nPlease try again with different values.");
        } else {
            this.toggleLoading();
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
                        orderTo:'',selectedState:'In Progress',loading:false})
                    alert("There are no work orders in that range for the given status.\nPlease try again with different values.");

                }else{
                    this.setState({returnedWorkOrders:[]});
                    var tempdata=data;
                    
                    tempdata.map(val=>this.state.returnedWorkOrders.push(val));
                    this.setState({loading:false, returnedWorkOrders:this.state.returnedWorkOrders})

                    console.log(this.state.returnedWorkOrders);
                }
                })
                .catch(console.log);
        }
        return false
    }
    /**
     * 
     * @param {the event of pushing the print button so we can prevent the reload of the page} e 
     * This function will pass the list of WO to jsreport for printing. It is very important
     * to change the template name when doing a build for dev or test
     * Dev : "/WorkOrdersDev/workOrders"
     * Test: "/WorkOrders/workOrders"
     */
    PrintWorkOrders(e) {
        e.preventDefault();
        
        jsreport.serverUrl = urls.jsreort;
        // TEMPLATE NAME NEED TO BE STRING LITERAL
        // MAKE SURE IT MATCHES THE BUILD
        let reportRequest = { template: { name: "/WorkOrders/workOrders" },
                              data: {workOrders:this.state.newWO},
                              express:{inputRequestLimit: "500mb"}
                            };
        jsreport.headers['Authorization'] = 'Basic ' + 'dmVyYTp2ZXJhd2F0ZXJhbmRwb3dlcg==';
        jsreport.renderAsync(reportRequest).then(function(res){
            console.log(res);
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                res.download("workorder.pdf");  
             }
             else {
                try{
                    var a = window.open(res.toObjectURL());
                    a.document.write(res);
                    a.document.close();
                }
                catch(e){
                    res.download("workorder.pdf");
                }
            }
        });
        return false;
    }
    /**
     * 
     * @param {the work order that needs to be pushed 
     *              added to a list to be printed} wo 
     * @param {a string for which meters need to be 
     *              associated with the workorder to be printed} SelectedMeters 
     * each test case will push the result to the state var newWO which is what will be
     * printed. The last if will allow the print button to be enabled once each WO has been 
     * assigned meters for printing
     */
    makeWOList(wo,SelectedMeters){
        var data;
        if(SelectedMeters == "all"){
            this.state.newWO.push(wo);
        }else if(SelectedMeters == "none"){
            wo.meters=[];
            this.state.newWO.push(wo);
        }
        else{
            data = wo.meters.filter(meter => meter.MeterIndex === SelectedMeters);
            console.log(data);
            wo.meters=[];
            wo.meters.push(data[0]);
            this.state.newWO.push(wo);

        }
        
        
        if(this.state.newWO.length === this.state.returnedWorkOrders.length){
            this.setState({disabled:false});
        }
        console.log(this.state.newWO);
    }
    render(){
    // this var populates the table on the page dynamicly   
    const workForms=(
            this.state.returnedWorkOrders.map((item)=>
                <tr key={item.WorkOrderIndex}>
                    <td>{item.WorkOrderIndex}</td>
                    <td>{item.creator}</td>
                    <td>
                    <FormGroup>
                        <Input type="select" name="select" onChange={(e)=> this.makeWOList(item, e.target.value)}>
                            <option >----</option>
                            <option value="none">None</option>
                            <option value="all">All</option>
                            {item.meters.map((meter)=>
                                <option value={meter.MeterIndex} >{meter.MeterIndex}</option>)}
                        
                        </Input>
                    </FormGroup>
                    </td>
                    <td>{item.description}</td>
                </tr>
            )
    )
        
        return (
            <div>
                <Breadcrumb className="Breadcrumbs">
                        <BreadcrumbItem ><a href={urls.homePage}>Apiary</a></BreadcrumbItem>
                        <BreadcrumbItem><a href="/">Work Management</a></BreadcrumbItem>
                        <BreadcrumbItem active>Work Orders</BreadcrumbItem>
                    </Breadcrumb>
                <header >
                    <h1>Work Orders</h1>
                </header>
                <Form>
                    <FormGroup>
                        <Input type="select" value={this.state.selectedState} onChange={(e)=> this.setState({selectedState:e.target.value})} >
                            <option value='Status options' header>Status options</option>
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
                    <Button type="submit" onClick={e=>this.GetWorkOrders(e)}>Get Work Orders</Button>
                    <Button type="submit" disabled={this.state.disabled} onClick={e=>this.PrintWorkOrders(e)}>Print</Button>

                </Form>
                <div>
                    <h4>Work Orders</h4>  
                        {this.state.loading ? <LoadingSpinner /> : 
                            <Table bordered dark hover>
                                <thead>
                                    <tr>
                                        <td>W.O. Number</td>
                                        <td>Creator</td>
                                        <td>Meter</td>
                                        <td>Description</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {workForms}
                                </tbody>
                            </Table>
                        }  
                </div>
                
            </div>
        )
    }
}
export default WorkOrders;