/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useProducts, useCustomers, useCart } from '../../store';
import NewSale from './NewSale';

const ProductTransaction = () => {
    const customers = useCustomers((state) => state.customers);
    const [value, setValue] = useState(customers[0]);
    const selectedProducts = useProducts((state) => state.selectedProducts);
    // const clearSelectedProducts = useProducts(
    //     (state) => state.clearSelectedProducts
    // );
    const addCartItems = useCart((state) => state.addItem);
    const cartItems = useCart((state) => state.items);
    const [showBtn, setShowBtn] = useState(0);

    const handleAdd = () => {
        addCartItems(selectedProducts);
        setShowBtn(selectedProducts.length);
    };

    return (
        <div>
            <h3>Transaction</h3>
            {selectedProducts.length !== showBtn &&
                selectedProducts.length !== 0 && (
                    <button
                        onClick={handleAdd}
                        type="button"
                    >{`Add ${selectedProducts.length} items to the cart`}</button>
                )}
            {cartItems &&
                cartItems.map((item) => (
                    <NewSale key={item.prdName} item={item} />
                ))}
            <Autocomplete
                value={value}
                onChange={(_event, newValue) => {
                    setValue(newValue);
                }}
                id="combo-box-demo"
                options={customers}
                getOptionLabel={(option) => option.custName}
                style={{ width: '70%', margin: '0 auto' }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select Customer"
                        variant="outlined"
                    />
                )}
            />
        </div>
    );
};

export default ProductTransaction;
