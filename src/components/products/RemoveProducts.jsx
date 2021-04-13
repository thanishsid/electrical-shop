import React from 'react';
import useStore from '../../store';

const RemoveProducts = () => {
    const selections = useStore((state) => state.selectedProducts);

    const removeSelectedProduct = useStore((state) => state.deleteProduct);

    const removeProducts = () => {
        // eslint-disable-next-line no-underscore-dangle
        selections.forEach((selection) => removeSelectedProduct(selection._id));
    };

    return (
        <div
            style={{
                border: '1px solid black',
                margin: '1rem',
                padding: '1rem',
            }}
        >
            <div style={{ overflowY: 'scroll', height: '60vh' }}>
                {selections.map((row) => {
                    return (
                        // eslint-disable-next-line no-underscore-dangle
                        <h4 key={row._id}>{`${row._id} ${row.prdName}`}</h4>
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
