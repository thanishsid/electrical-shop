import React from 'react';
import { useSales } from '../../store';

const ReturnSale = () => {
    const selectedSales = useSales((state) => state.selectedSales);

    const returnSale = selectedSales[0];

    if (selectedSales.length < 1) {
        return <h3>Please Select a Sale to Return</h3>;
    }
    if (selectedSales.length > 1) {
        return <h3>Please Select Only One Sale</h3>;
    }
    return (
        <div className="tbl">
            <div className="tr">
                <div className="tc">Name</div>
                <div className="tc">Qty</div>
                <div className="tc">Sale Price</div>
                <div className="tc">Return</div>
            </div>
            {returnSale.items.map((item) => {
                return (
                    <div key={item.prdName} className="tr">
                        <div className="tc">{item.prdName}</div>
                        <div className="tc">{item.prdQty}</div>
                        <div className="tc">{item.salePrice}</div>
                        <div className="tc">↩</div>
                    </div>
                );
            })}
        </div>
    );
};

export default ReturnSale;
