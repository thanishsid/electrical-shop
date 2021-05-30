/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react';
import DataTable from '../common/Table';
import useStore from '../../stores/store';

export default function ProductsTable() {
    const data = useStore((state) => state.products);

    const setProductSelection = useStore((state) => state.setProductSelection);

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'prdName',
            },
            {
                Header: 'Qty',
                accessor: 'prdQty',
            },
            {
                Header: 'Cost',
                accessor: 'prdCost',
            },
            {
                Header: 'Wholesale Price',
                accessor: 'prdWhPrice',
            },
            {
                Header: 'Retail Price',
                accessor: 'prdRePrice',
            },
        ],
        []
    );

    return (
        <div className="half">
            <DataTable
                type="products"
                rowData={data}
                columnData={columns}
                setSelectedRows={setProductSelection}
            />
        </div>
    );
}
