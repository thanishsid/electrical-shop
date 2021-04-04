import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import useStore from '../store';

const columns = [
    { field: 'id', headerName: 'ID', type: 'number', width: 70 },
    { field: 'product_name', headerName: 'Name', width: 180 },
    { field: 'qty', headerName: 'Qty', type: 'number', width: 100 },
    {
        field: 'cost',
        headerName: 'Cost',
        type: 'number',
        width: 150,
    },
    {
        field: 'wholesalePrice',
        headerName: 'Wholesale Price',
        type: 'number',
        width: 180,
    },
    {
        field: 'retailPrice',
        headerName: 'Retail Price',
        type: 'number',
        width: 180,
    },
];

// const rows = [
//     {
//         id: 1,
//         product_name: 'Snow',
//         qty: 55,
//         cost: 35.76,
//         wholesalePrice: 125.68,
//         retailPrice: 223.85,
//     },
//     {
//         id: 2,
//         product_name: 'Sand',
//         qty: 65,
//         cost: 95.76,
//         wholesalePrice: 225.68,
//         retailPrice: 323.85,
//     },
// ];

const selectedProds = (state) => state.selectedProducts;

export default function ProductsTable() {
    const setProducts = useStore((state) => state.setProducts);

    const selectedProducts = useStore(selectedProds);

    const products = useStore((state) => state.products);

    const [selectionModel, setSelectionModel] = useState([]);

    useEffect(() => {
        const model = selectedProducts.map((row) => row.id.toString());
        setSelectionModel(model);
        setProducts();
        console.count('hi');
    }, [selectedProducts, setProducts]);

    const setSelection = useStore((state) => state.setSelection);

    return (
        <div
            style={{
                height: '90vh',
                width: '50%',
            }}
        >
            <DataGrid
                rows={products || []}
                columns={columns}
                checkboxSelection
                pageSize={20}
                onRowSelected={(row) => setSelection(row)}
                onSelectionModelChange={(newSelection) => {
                    setSelectionModel(newSelection.selectionModel);
                }}
                selectionModel={selectionModel}
            />
        </div>
    );
}

//
//
