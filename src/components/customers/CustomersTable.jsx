import React, { useMemo } from 'react';
import DataTable from '../common/Table';
import useStore from '../../stores/store';

const CustomersTable = () => {
    const data = useStore((state) => state.customers);

    const setCustomerSelection = useStore(
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
