import React from 'react';
import OrdersTable from '../components/orders/OrdersTable';
import ManageOrders from '../components/orders/ManageOrders';

const OrdersScreen = () => {
    return (
        <div className="screens">
            <OrdersTable />
            <ManageOrders />
        </div>
    );
};

export default OrdersScreen;
