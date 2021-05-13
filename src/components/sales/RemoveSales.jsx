import React from 'react';
import DeleteItems from '../common/DeleteItems';
import { useSales } from '../../stores/store';

const RemoveSales = () => {
    const selections = useSales((state) => state.selectedSales);

    const removeSelectedSale = useSales((state) => state.deleteSale);

    const clearSelectedSales = useSales((state) => state.clearSelectedSales);

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
