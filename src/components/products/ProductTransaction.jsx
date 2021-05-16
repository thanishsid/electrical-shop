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
} from '../../stores/store';
import CartItem from './CartItem';
import TransactionTypeSelector from '../common/TransactionTypeSelector';

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

const CartContainer = styled.section`
    margin-top: 1rem;
`;

const Table = styled.table`
    border: solid 2px rgb(161, 155, 155);
    border-radius: 0.5em;
    width: 100%;
`;

const TableHeader = styled.thead`
    width: 100%;
    border-bottom: solid 2px rgb(209, 27, 27);
    background: rgba(9, 167, 80, 0.116);
    color: black;
    display: block;
`;

const TableBody = styled.tbody`
    display: block;
    height: 40vh;
    overflow-y: auto;
`;

const CartTableRow = styled.tr`
    display: table;
    width: 100%;
    table-layout: fixed;
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

    const addCartItems = useCart((state) => state.addItem);
    const cartItems = useCart((state) => state.items);
    const clearCart = useCart((state) => state.clearCart);
    const insertSale = useSales((state) => state.insertSale);

    const handleAdd = () => {
        addCartItems(selectedProducts);
    };

    const handleTransaction = async () => {
        const { updatedProducts } = await insertSale(
            cartItems,
            selectedCustomer
        );
        updateProductQty(updatedProducts);
        refreshProductSelection(updatedProducts, true);
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

            <CartContainer>
                <Table>
                    <TableHeader>
                        <CartTableRow>
                            <th>Name</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Net</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </CartTableRow>
                    </TableHeader>
                    <TableBody>
                        {cartItems.length !== 0 &&
                            cartItems.map((item) => (
                                <CartItem
                                    key={item.prdName}
                                    item={item}
                                    transactionType={transactionType}
                                />
                            ))}
                    </TableBody>
                </Table>
            </CartContainer>
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
                Confirm Sale
            </ConfirmSaletButton>
        </TransactionContainer>
    );
};

export default ProductTransaction;
