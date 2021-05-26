/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';

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

    const preventMinus = (e) => {
        if (e.code === 'Minus') {
            e.preventDefault();
        }
    };

    const preventPasteNegative = (e) => {
        const clipboardData = e.clipboardData || window.clipboardData;
        const pastedData = parseFloat(clipboardData.getData('text'));

        if (pastedData < 0) {
            e.preventDefault();
        }
    };

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
                onPaste={preventPasteNegative}
                onChange={handleCustomSalePrice}
                onKeyPress={preventMinus}
            />
        </div>
    );
}
