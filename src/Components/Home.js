import React from 'react';
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';

function Home() {
    return (
        <div>
            <Breadcrumb className="Breadcrumbs">
                <BreadcrumbItem >Apiary</BreadcrumbItem>
                <BreadcrumbItem >Work Management</BreadcrumbItem>
            </Breadcrumb>
                
            <h1>Work Management</h1>
            <Button size="lg" className="Breadcrumbs" ><a href="/workOrders">Work Orders</a></Button>
        </div>
    )
}
export default Home;