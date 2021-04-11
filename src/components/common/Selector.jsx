import React, { useState } from 'react';
import useStore from '../../store';

const Selector = ({ row }) => {
    const [selected, setSelected] = useState(false);

    const setSelection = useStore((state) => state.setSelection);

    const handleChange = (event) => {
        event.persist();
        setSelected(event.target.checked);
        setSelection({ isSelected: event.target.checked, data: row });
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
