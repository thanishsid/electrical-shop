import React from 'react';
import DeleteItems from '../common/DeleteItems';
import { useCustomers } from '../../store';

const RemoveCustomers = () => {
    const selections = useCustomers((state) => state.selectedCustomers);

    const removeSelectedCustomer = useCustomers(
        (state) => state.deleteCustomer
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
        />
    );
};

export default RemoveCustomers;
