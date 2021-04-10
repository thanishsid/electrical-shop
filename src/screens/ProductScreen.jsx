import React from 'react';
import ProductsTable from '../components/products/ProductsTable';
import ManageProducts from '../components/products/ManageProducts';

const ProductScreen = () => {
    return (
        <div className="screens">
            <ProductsTable />
            <ManageProducts />
        </div>
    );
};

export default ProductScreen;
