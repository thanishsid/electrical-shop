import React from 'react';
import AddProducts from './AddProducts';
import DeleteProducts from './DeleteProducts';

const ManageProducts = () => {
    return (
        <div style={{ height: '90vh', width: '50%' }}>
            <AddProducts />
            <DeleteProducts />
        </div>
    );
};

export default ManageProducts;
