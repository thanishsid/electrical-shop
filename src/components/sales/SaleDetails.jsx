/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useSales } from '../../store';
import SaleItem from './SaleItem';
import './SaleDetails.css';

const SaleDetails = () => {
    const selectedSales = useSales((state) => state.selectedSales);

    return (
        <div className="saleDetails">
            <div className="tbl">
                <div className="tr">
                    <div className="tc">
                        <p>ID</p>
                    </div>
                    <div className="tc">
                        <p>Time</p>
                    </div>
                    <div className="tc">
                        <p>Customer</p>
                    </div>
                    <div className="tc">
                        <p>Items</p>
                    </div>
                </div>
                {selectedSales.map((sale) => (
                    <SaleItem key={sale._id} sale={sale} />
                ))}
            </div>
        </div>
    );
};

export default SaleDetails;
