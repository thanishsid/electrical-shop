import React, { useMemo } from 'react';
import DataTable from '../common/Table';
import { useSales } from '../../stores/store';

const SalesTable = () => {
    const data = useSales((state) => state.sales);

    const columns = useMemo(
        () => [
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
            <DataTable type="sales" rowData={data} columnData={columns} />
        </div>
    );
};

export default SalesTable;
