/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    useProducts,
    useCustomers,
    useCart,
    useSales,
    useOrders,
} from '../../stores/store';
import Cart from './transaction/Cart';
import TransactionTypeSelector from './transaction/TransactionTypeSelector';

const TransactionContainer = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    height: 100%;
`;

const AddToCartButton = styled(Button)`
    &:hover {
        background: #44cc44;
    }
`;

const CustomerSelector = styled(Autocomplete)`
    width: 100%;
    margin: 1rem auto;
`;

const ConfirmSaletButton = styled(Button)`
    width: 100%;
    margin-top: auto;
    &:hover {
        background: #44cc44;
    }
`;

const ProductTransaction = () => {
    const [transactionType, setTransactionType] = React.useState('sale');
    const customers = useCustomers((state) => state.customers);
    const [selectedCustomer, setselectedCustomer] = useState(null);
    const selectedProducts = useProducts((state) => state.selectedProducts);
    const updateProductQty = useProducts((state) => state.updateProductQty);
    const refreshProductSelection = useProducts(
        (state) => state.refreshProductSelection
    );

    const addCartItems = useCart((state) => state.addItems);
    const cartItems = useCart((state) => state.items);
    const clearCart = useCart((state) => state.clearCart);
    const insertSale = useSales((state) => state.insertSale);
    const insertOrder = useOrders((state) => state.insertOrder);

    const handleAdd = () => {
        addCartItems(transactionType, selectedProducts);
    };

    const handleTransaction = async () => {
        if (transactionType === 'sale') {
            const { updatedProducts } = await insertSale(
                cartItems,
                selectedCustomer
            );
            updateProductQty(updatedProducts);
            refreshProductSelection(updatedProducts, true);
        } else if (transactionType === 'order') {
            insertOrder(cartItems, selectedCustomer);
        }
        clearCart();
        setselectedCustomer(null);
    };

    const handleSwitchTransactionType = (event) => {
        setTransactionType(event.target.value);
        clearCart();
        setselectedCustomer(null);
    };

    return (
        <TransactionContainer>
            <TransactionTypeSelector
                transactionType={transactionType}
                handleSwitchTransactionType={handleSwitchTransactionType}
            />
            <AddToCartButton
                disabled={!selectedProducts.length}
                onClick={handleAdd}
                variant="contained"
                startIcon={<AddIcon />}
            >{`Add ${selectedProducts.length} items to the cart`}</AddToCartButton>
            <Cart cartItems={cartItems} transactionType={transactionType} />
            <CustomerSelector
                value={selectedCustomer}
                onChange={(_event, newValue) => {
                    setselectedCustomer(newValue);
                }}
                id="combo-box-demo"
                options={customers}
                getOptionLabel={(option) => option.custName}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select Customer"
                        variant="outlined"
                    />
                )}
            />
            <ConfirmSaletButton
                disabled={!cartItems.length}
                variant="contained"
                onClick={handleTransaction}
            >
                {transactionType === 'sale' ? 'Confirm Sale' : 'Add Order'}
            </ConfirmSaletButton>
        </TransactionContainer>
    );
};

export default ProductTransaction;
