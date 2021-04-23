/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useProducts, useCustomers, useCart, useSales } from '../../store';
import CartItem from './CartItem';
import './ProductTransaction.css';
import './cart.css';

const ProductTransaction = () => {
    const customers = useCustomers((state) => state.customers);
    const [selectedCustomer, setselectedCustomer] = useState(customers[0]);
    const selectedProducts = useProducts((state) => state.selectedProducts);

    const addCartItems = useCart((state) => state.addItem);
    const cartItems = useCart((state) => state.items);

    const insertSale = useSales((state) => state.insertSale);

    const handleAdd = () => {
        addCartItems(selectedProducts);
    };

    const handleSale = () => {
        insertSale(cartItems, selectedCustomer);
    };

    return (
        <div style={{ marginTop: '1rem' }}>
            <button
                disabled={!selectedProducts.length}
                onClick={handleAdd}
                type="button"
            >{`Add ${selectedProducts.length} items to the cart`}</button>

            <div className="cart">
                <table className="cartTable">
                    <thead className="cartTableHeader">
                        <tr className="cartTableRow">
                            <th>Name</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Net</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody className="cartTableBody">
                        {cartItems.length !== 0 &&
                            cartItems.map((item) => (
                                <CartItem key={item.prdName} item={item} />
                            ))}
                    </tbody>
                </table>
            </div>
            <Autocomplete
                value={selectedCustomer}
                onChange={(_event, newValue) => {
                    setselectedCustomer(newValue);
                }}
                id="combo-box-demo"
                options={customers}
                getOptionLabel={(option) => option.custName}
                style={{ width: '70%', margin: '2rem auto' }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select Customer"
                        variant="outlined"
                    />
                )}
            />
            <button
                disabled={!cartItems.length}
                type="button"
                onClick={handleSale}
            >
                Confirm Sale
            </button>
        </div>
    );
};

export default ProductTransaction;
