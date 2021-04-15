import React from 'react';
import DeleteItems from '../common/DeleteItems';
import useStore from '../../store';

const RemoveCustomers = () => {
    const selections = useStore((state) => state.selectedCustomers);

    const removeSelectedCustomer = useStore((state) => state.deleteCustomer);

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
