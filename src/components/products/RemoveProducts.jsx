import React from 'react';
import DeleteItems from '../common/DeleteItems';
import { useProducts } from '../../store';

const RemoveProducts = () => {
    const selections = useProducts((state) => state.selectedProducts);

    const removeSelectedProduct = useProducts((state) => state.deleteProduct);
    const setProducts = useProducts((state) => state.setProducts);
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
            updateFunctions={[clearSelectedProducts, setProducts]}
        />
    );
};

export default RemoveProducts;
