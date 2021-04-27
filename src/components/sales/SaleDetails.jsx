import React from 'react';
import { useSales } from '../../store';

const SaleDetails = () => {
    const selectedSales = useSales((state) => state.selectedSales);
    console.log(selectedSales);
    return (
        <div>
            <h2>Sale Details</h2>
            {selectedSales.map((sale) =>
                sale.items.map((item) => (
                    <h3 key={item.prdName}>{item.prdName}</h3>
                ))
            )}
        </div>
    );
};

export default SaleDetails;
