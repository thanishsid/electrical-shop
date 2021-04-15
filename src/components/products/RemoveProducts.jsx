import React from 'react';
import DeleteItems from '../common/DeleteItems';
import useStore from '../../store';

const RemoveProducts = () => {
    const selections = useStore((state) => state.selectedProducts);

    const removeSelectedProduct = useStore((state) => state.deleteProduct);

    const removeProducts = () => {
        // eslint-disable-next-line no-underscore-dangle
        selections.forEach((selection) => removeSelectedProduct(selection._id));
    };

    return (
        <DeleteItems
            btnLabel="Delete Products"
            items={selections}
            deleteFunction={removeProducts}
        />
    );
};

export default RemoveProducts;
