import React from 'react';
import { useParams } from 'react-router-dom';
import ProductTransaction from './ProductTransaction';
import AddProducts from './AddProducts';
import EditProducts from './EditProducts';
import RemoveProducts from './RemoveProducts';

const ProductFunctions = () => {
    const { funcId } = useParams();

    switch (funcId) {
        case 'transaction':
            return <ProductTransaction />;
        case 'add':
            return <AddProducts />;
        case 'edit':
            return <EditProducts />;
        case 'remove':
            return <RemoveProducts />;
        default:
            return null;
    }
};

export default ProductFunctions;
