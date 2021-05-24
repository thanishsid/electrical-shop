import React, { useMemo } from 'react';
import DataTable from '../common/Table';
import { useCustomers } from '../../stores/store';

const CustomersTable = () => {
    const data = useCustomers((state) => state.customers);

    const setCustomerSelection = useCustomers(
        (state) => state.setCustomerSelection
    );

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'custName',
            },
            {
                Header: 'Phone No',
                accessor: 'custPhone',
            },
        ],
        []
    );

    return (
        <div className="half">
            <DataTable
                type="customers"
                rowData={data}
                columnData={columns}
                setSelectedRows={setCustomerSelection}
            />
        </div>
    );
};

export default CustomersTable;
