import React, { useMemo } from 'react';
import Table from '../common/Table';
import { useCustomers } from '../../store';

const CustomersTable = () => {
    const data = useCustomers((state) => state.customers);

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
        <div className="leftHalf">
            <Table type="customers" rowData={data} columnData={columns} />
        </div>
    );
};

export default CustomersTable;
