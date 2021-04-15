import React, { useState } from 'react';
import { useProducts, useCustomers } from '../../store';

const Selector = ({ row, type }) => {
    const [selected, setSelected] = useState(false);

    const setProductSelection = useProducts(
        (state) => state.setProductSelection
    );

    const setCustomerSelection = useCustomers(
        (state) => state.setCustomerSelection
    );

    const handleChange = (event) => {
        event.persist();
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
        <td className="tableCell widen">
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
