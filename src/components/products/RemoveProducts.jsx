import React from 'react';
import DeleteItems from '../common/DeleteItems';
import { useProducts, useCart } from '../../stores/store';

const RemoveProducts = () => {
    const selections = useProducts((state) => state.selectedProducts);

    const removeSelectedProduct = useProducts((state) => state.deleteProduct);
    const clearCart = useCart((state) => state.clearCart);

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
