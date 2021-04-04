import React from 'react';
import useStore from '../store';

const DeleteProducts = () => {
    const selections = useStore((state) => state.selectedProducts);
    return (
        <div style={{ border: '1px solid black' }}>
            {selections.map((row) => {
                return <h4 key={row.id}>{`${row.id} ${row.product_name}`}</h4>;
            })}
        </div>
    );
};

export default DeleteProducts;
