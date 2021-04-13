import React, { useEffect, useMemo } from 'react';
import Table from '../common/Table';
import useStore from '../../store';

const CustomersTable = () => {
    const setCustomers = useStore((state) => state.setCustomers);

    const data = useStore((state) => state.customers);

    useEffect(() => {
        setCustomers();
    }, [setCustomers]);

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
            <Table rowData={data} columnData={columns} />
        </div>
    );
};

export default CustomersTable;
