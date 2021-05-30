import React from 'react';
import DeleteItems from '../common/DeleteItems';
import useStore from '../../stores/store';

const RemoveSales = () => {
    const selections = useStore((state) => state.selectedSales);

    const removeSelectedSale = useStore((state) => state.deleteSale);

    const clearSelectedSales = useStore((state) => state.clearSelectedSales);

    const removeSales = () => {
        // eslint-disable-next-line no-underscore-dangle
        selections.forEach((selection) => removeSelectedSale(selection._id));
    };

    return (
        <DeleteItems
            btnLabel="Delete Sales"
            items={selections}
            deleteFunction={removeSales}
            updateFunction={clearSelectedSales}
        />
    );
};

export default RemoveSales;
