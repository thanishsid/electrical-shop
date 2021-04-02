import React from 'react';
// import useStore from '../store';
import ProductsTable from '../components/ProductsTable';
import ManageProducts from '../components/ManageProducts';

const ProductScreen = () => {
    // const setProducts = useStore((state) => state.setProducts);
    // useEffect(() => {
    //     console.count('hi');

    //     setProducts();
    // });

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
