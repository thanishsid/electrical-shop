import React from 'react';
import { useParams } from 'react-router-dom';
import AddCustomers from './AddCustomers';
import EditCustomer from './EditCustomer';
import RemoveCustomers from './RemoveCustomers';

const CustomerFunctions = () => {
    const { funcId } = useParams();

    switch (funcId) {
        case 'add':
            return <AddCustomers />;
        case 'edit':
            return <EditCustomer />;
        case 'remove':
            return <RemoveCustomers />;
        default:
            return null;
    }
};

export default CustomerFunctions;
