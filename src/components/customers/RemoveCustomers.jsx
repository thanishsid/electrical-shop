import React from 'react';
import DeleteItems from '../common/DeleteItems';
import { useCustomers } from '../../stores/store';

const RemoveCustomers = () => {
    const selections = useCustomers((state) => state.selectedCustomers);

    const removeSelectedCustomer = useCustomers(
        (state) => state.deleteCustomer
    );

    const setCustomers = useCustomers((state) => state.setCustomers);
    const clearSelectedCustomers = useCustomers(
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
