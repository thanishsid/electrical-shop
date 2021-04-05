import React from 'react';
import ProductsTable from '../components/products/ProductsTable';
import ManageProducts from '../components/products/ManageProducts';

const ProductScreen = () => {
    return (
        <div
            style={{
                display: 'flex',
                margin: '1em 2em',
            }}
        >
            <ProductsTable />
            <ManageProducts />
        </div>
    );
};

export default ProductScreen;
