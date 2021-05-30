import React from 'react';
import DeleteItems from '../common/DeleteItems';
import useStore from '../../stores/store';

const RemoveProducts = () => {
    const selections = useStore((state) => state.selectedProducts);

    const removeSelectedProduct = useStore((state) => state.deleteProduct);
    const clearCart = useStore((state) => state.clearCart);

    const removeProducts = () => {
        // eslint-disable-next-line no-underscore-dangle
        selections.forEach((selection) => removeSelectedProduct(selection._id));
    };

    return (
        <DeleteItems
            btnLabel="Delete Products"
            items={selections}
            deleteFunction={removeProducts}
            updateFunction={clearCart}
        />
    );
};

export default RemoveProducts;
