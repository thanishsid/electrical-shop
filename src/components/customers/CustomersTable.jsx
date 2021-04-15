import React, { useMemo } from 'react';
import Table from '../common/Table';
import useStore from '../../store';

const CustomersTable = () => {
    const data = useStore((state) => state.customers);

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
