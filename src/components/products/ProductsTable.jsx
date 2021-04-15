/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react';
import Table from '../common/Table';
import useStore from '../../store';

// const selectedProds = (state) => state.selectedProducts;

export default function ProductsTable() {
    const data = useStore((state) => state.products);

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
        <div className="leftHalf">
            <Table type="products" rowData={data} columnData={columns} />
        </div>
    );
}
