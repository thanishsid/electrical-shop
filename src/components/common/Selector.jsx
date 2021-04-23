import React, { useState, useEffect } from 'react';
import { useProducts, useCustomers, useSales } from '../../store';

const Selector = ({ row, type }) => {
    const [selected, setSelected] = useState(false);

    const setProductSelection = useProducts(
        (state) => state.setProductSelection
    );

    const setCustomerSelection = useCustomers(
        (state) => state.setCustomerSelection
    );

    const productSelection = useProducts((state) => state.selectedProducts);

    const customerSelection = useCustomers((state) => state.selectedCustomers);

    const salesSelection = useSales((state) => state.selectedSales);

    useEffect(() => {
        if (type === 'products') {
            productSelection.forEach((product) => {
                // eslint-disable-next-line no-underscore-dangle
                if (product._id === row._id) {
                    setSelected(true);
                }
            });
        } else if (type === 'customers') {
            customerSelection.forEach((customer) => {
                // eslint-disable-next-line no-underscore-dangle
                if (customer._id === row._id) {
                    setSelected(true);
                }
            });
        } else if (type === 'sales') {
            salesSelection.forEach((sale) => {
                // eslint-disable-next-line no-underscore-dangle
                if (sale._id === row._id) {
                    setSelected(true);
                }
            });
        }
        // eslint-disable-next-line no-underscore-dangle
    }, [customerSelection, productSelection, row._id, salesSelection, type]);

    const handleChange = (event) => {
        // event.persist();
        setSelected(event.target.checked);

        if (type === 'products') {
            setProductSelection({
                isSelected: event.target.checked,
                data: row,
            });
        } else if (type === 'customers') {
            setCustomerSelection({
                isSelected: event.target.checked,
                data: row,
            });
        }
    };
    return (
        <td className="tableCell shrink">
            <input
                className="selectBox"
                type="checkbox"
                checked={selected}
                onChange={handleChange}
            />
        </td>
    );
};

export default Selector;
