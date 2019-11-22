import React, {Component} from 'react';
//import fetch from 'isomorphic-fetch';
import { Input } from 'reactstrap';


class WorkOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedState: null,
          setState:false,
          orderFrom:Number,
          orderTo:Number,
        };
      }
      ChangeinState(){
          //fetch for workorder numbers
      }
      render(){

        return (
            <div>
                <header >
                    <h1>Work Orders</h1>
                </header>
                <div>
                    <Input type="select"  value={this.state.selectedState} onChange={(e)=> this.setState({ selectedState: e.target.value }), this.ChangeinState()}>
                        <option value="null"> --- </option>
                        <option value="void"> Void </option>
                        <option value="not started"> Not Started </option>
                        <option value="in progress"> In Progress </option>
                        <option value="closed"> Closed </option>
                    </Input>
                </div>
            </div>
        )
      }
}
export default WorkOrders;