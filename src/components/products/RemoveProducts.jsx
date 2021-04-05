import React from 'react';
import useStore from '../../store';

const RemoveProducts = () => {
    const selections = useStore((state) => state.selectedProducts);

    const removeSelectedProduct = useStore((state) => state.deleteProduct);

    const removeProducts = () => {
        selections.forEach((selection) => removeSelectedProduct(selection.id));
    };

    return (
        <div
            style={{
                border: '1px solid black',
                margin: '1rem',
                padding: '1rem',
            }}
        >
            <div>
                {selections.map((row) => {
                    return (
                        <h4 key={row.id}>{`${row.id} ${row.product_name}`}</h4>
                    );
                })}
            </div>
            <button type="button" onClick={removeProducts}>
                Remove Products
            </button>
        </div>
    );
};

export default RemoveProducts;
