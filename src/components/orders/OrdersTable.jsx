import React, { useMemo } from 'react';
import { format } from 'date-fns';
import DataTable from '../common/Table';
import useStore from '../../stores/store';

const OrdersTable = () => {
    const data = useStore((state) => state.orders);
    const setOrdersSelection = useStore((state) => state.setOrdersSelection);

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
                setSelectedRows={setOrdersSelection}
            />
        </div>
    );
};

export default OrdersTable;
