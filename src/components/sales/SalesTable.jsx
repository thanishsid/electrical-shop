import React, { useMemo } from 'react';
import { format } from 'date-fns';
import DataTable from '../common/Table';
import useStore from '../../stores/store';

const SalesTable = () => {
    const data = useStore((state) => state.sales);

    const setSalesSelection = useStore((state) => state.setSalesSelection);

    const columns = useMemo(
        () => [
            {
                Header: 'Time',
                accessor: 'time',
                Cell: ({ value }) => {
                    return format(
                        new Date(value),
                        "do 'of' LLL yyyy 'at' hh:mm a"
                    );
                },
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
            <DataTable
                type="sales"
                rowData={data}
                columnData={columns}
                setSelectedRows={setSalesSelection}
            />
        </div>
    );
};

export default SalesTable;
