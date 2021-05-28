/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import { preventNegativeProps } from '../../../functions/generalFunctions';

export default function PriceSelector({
    saleType,
    setSaleType,
    handleCustomSalePrice,
}) {
    const types = [
        { name: 'Retail', value: 'retail' },
        { name: 'Wholesale', value: 'wholesale' },
        { name: 'Custom', value: 'custom' },
    ];

    return (
        <div className="flex flex-col">
            <select
                className="font-bold h-8 rounded-md focus:outline-none pl-2"
                name="types"
                id="types"
                onChange={(event) => setSaleType(event.target.value)}
            >
                {types.map((type) => (
                    <option
                        className="font-bold rounded-lg"
                        key={type.value}
                        value={type.value}
                    >
                        {type.name}
                    </option>
                ))}
            </select>
            <input
                className={`${saleType !== 'custom' ? 'hidden' : ''} input`}
                type="number"
                min="0"
                disabled={saleType !== 'custom'}
                placeholder="Set Price"
                onChange={handleCustomSalePrice}
                {...preventNegativeProps}
            />
        </div>
    );
}
