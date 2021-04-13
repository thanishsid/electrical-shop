import React from 'react';
import { useParams } from 'react-router-dom';

import AddCustomers from './AddCustomers';
import EditCustomer from './EditCustomer';
import RemoveCustomer from './RemoveCustomer';

const CustomerFunctions = () => {
    const { funcId } = useParams();

    switch (funcId) {
        case 'add':
            return <AddCustomers />;
        case 'edit':
            return <EditCustomer />;
        case 'remove':
            return <RemoveCustomer />;
        default:
            return null;
    }
};

export default CustomerFunctions;
