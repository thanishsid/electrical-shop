/* eslint-disable no-underscore-dangle */
import React from 'react';

const SaleItem = ({ sale }) => {
    const [hideItems, sethideItems] = React.useState(true);
    return (
        <>
            <div className="tr">
                <div className="tc">
                    <p>{sale._id}</p>
                </div>
                <div className="tc">
                    <p>{sale.time}</p>
                </div>
                <div className="tc">
                    <p>{sale.customer.customerName}</p>
                </div>
                <div className="tc vwBtnContainer">
                    <button
                        className="btnViewItems"
                        type="button"
                        onClick={() => sethideItems(!hideItems)}
                    >
                        View Items
                    </button>
                </div>
            </div>
            <div className="tr itemSpace">
                <div className="tbl">
                    <div className={`tr tcitems ${hideItems && 'hide'}`}>
                        <div className="tc">Name</div>
                        <div className="tc">Qty</div>
                        <div className="tc">Sale Price</div>
                    </div>
                    {sale.items.map((item) => (
                        <div
                            key={item._id}
                            className={`tr tcitems ${hideItems && 'hide'}`}
                        >
                            <div className="tc">{item.prdName}</div>
                            <div className="tc">{item.prdQty}</div>
                            <div className="tc">{item.salePrice}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SaleItem;
