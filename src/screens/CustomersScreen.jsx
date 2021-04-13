import React from 'react';
import CustomersTable from '../components/customers/CustomersTable';
import ManageCustomers from '../components/customers/ManageCustomers';

const CustomersScreen = () => {
    return (
        <div className="screens">
            <CustomersTable />
            <ManageCustomers />
        </div>
    );
};

export default CustomersScreen;
