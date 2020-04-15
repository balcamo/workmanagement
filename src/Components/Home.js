import React from 'react';
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import * as urls from '../urlsConfig';

function Home() {
    return (
        <div>
            <Breadcrumb className="Breadcrumbs">
                <BreadcrumbItem ><a href={urls.homePage}>Apiary</a></BreadcrumbItem>
                <BreadcrumbItem active >Work Management</BreadcrumbItem>
            </Breadcrumb>
                
            <h1>Work Management</h1>
            
            <Button size="lg" className="homeButtons" href="/workOrders">Work Orders</Button>
        </div>
    )
}
export default Home;