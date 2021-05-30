import React from 'react';
import DeleteItems from '../common/DeleteItems';
import useStore from '../../stores/store';

const RemoveCustomers = () => {
    const selections = useStore((state) => state.selectedCustomers);

    const removeSelectedCustomer = useStore((state) => state.deleteCustomer);

    const setCustomers = useStore((state) => state.setCustomers);
    const clearSelectedCustomers = useStore(
        (state) => state.clearSelectedCustomers
    );

    const removeCustomers = () => {
        selections.forEach((selection) =>
            // eslint-disable-next-line no-underscore-dangle
            removeSelectedCustomer(selection._id)
        );
    };

    return (
        <DeleteItems
            btnLabel="Delete Customers"
            items={selections}
            deleteFunction={removeCustomers}
            updateFunctions={[clearSelectedCustomers, setCustomers]}
        />
    );
};

export default RemoveCustomers;
