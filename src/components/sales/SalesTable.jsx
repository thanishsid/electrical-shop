import React, { useMemo } from 'react';
import Table from '../common/Table';
import { useSales } from '../../store';

const SalesTable = () => {
    const data = useSales((state) => state.sales);

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: '_id',
            },
            {
                Header: 'Time',
                accessor: 'time',
            },
            {
                Header: 'Customer',
                accessor: 'customer.customerName',
            },
        ],
        []
    );

    return (
        <div className="half">
            <Table type="sales" rowData={data} columnData={columns} />
        </div>
    );
};

export default SalesTable;
