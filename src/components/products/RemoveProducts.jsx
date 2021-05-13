import React from 'react';
import DeleteItems from '../common/DeleteItems';
import { useProducts } from '../../stores/store';

const RemoveProducts = () => {
    const selections = useProducts((state) => state.selectedProducts);

    const removeSelectedProduct = useProducts((state) => state.deleteProduct);
    const clearSelectedProducts = useProducts(
        (state) => state.clearSelectedProducts
    );

    const removeProducts = () => {
        // eslint-disable-next-line no-underscore-dangle
        selections.forEach((selection) => removeSelectedProduct(selection._id));
    };

    return (
        <DeleteItems
            btnLabel="Delete Products"
            items={selections}
            deleteFunction={removeProducts}
            updateFunction={clearSelectedProducts}
        />
    );
};

export default RemoveProducts;
