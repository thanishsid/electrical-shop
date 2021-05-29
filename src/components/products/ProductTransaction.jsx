/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useAlert } from 'react-alert';
import {
    useProducts,
    useCustomers,
    useCart,
    useSales,
    useOrders,
} from '../../stores/store';
import Cart from './transaction/Cart';
import TransactionTypeSelector from './transaction/TransactionTypeSelector';

const ProductTransaction = () => {
    const [transactionType, setTransactionType] = React.useState('sale');
    const customers = useCustomers((state) => state.customers);
    const [selectedCustomer, setselectedCustomer] = useState(null);
    const [addable, setAddable] = useState(0);
    const selectedProducts = useProducts((state) => state.selectedProducts);
    const updateProductQty = useProducts((state) => state.updateProductQty);

    const addCartItems = useCart((state) => state.addItems);
    const cartItems = useCart((state) => state.items);
    const clearCart = useCart((state) => state.clearCart);
    const insertSale = useSales((state) => state.insertSale);
    const insertOrder = useOrders((state) => state.insertOrder);

    const alert = useAlert();

    const handleAdd = () => {
        addCartItems(transactionType, selectedProducts);
    };

    const handleTransaction = async () => {
        if (transactionType === 'sale') {
            const data = await insertSale(cartItems, selectedCustomer);
            if (data.name !== 'Error') {
                updateProductQty(data.updatedProducts);
                alert.success('Sale Successful');
            } else {
                alert.error(data.message);
            }
        } else if (transactionType === 'order') {
            const data = insertOrder(cartItems, selectedCustomer);
            if (data.name !== 'Error') {
                alert.success('Order Added Successfully');
            }
        }
        clearCart();
        setselectedCustomer(null);
    };

    const handleSwitchTransactionType = (event) => {
        setTransactionType(event.target.value);
        clearCart();
        setselectedCustomer(null);
    };

    useEffect(() => {
        const handleCartBtn = () => {
            const notSame = selectedProducts.filter((product) => {
                return !cartItems.some((item) => item._id === product._id);
            });

            return notSame.length;
        };
        setAddable(handleCartBtn());
    }, [cartItems, selectedProducts]);

    return (
        <div className="flex flex-col px-2 pt-4 h-full">
            <TransactionTypeSelector
                transactionType={transactionType}
                handleSwitchTransactionType={handleSwitchTransactionType}
            />
            <div className="flex">
                <button
                    type="button"
                    className={`${
                        addable ? 'cart-btn' : 'btn-disabled bg-gray-200'
                    } w-1/2 mr-1`}
                    disabled={!addable}
                    onClick={handleAdd}
                >
                    <span className="flex justify-center">
                        {addable ? (
                            <>
                                <AiOutlinePlus size="1.3rem" />
                                <p className="ml-1">
                                    {`Add ${addable} ${
                                        addable > 1 ? 'items' : 'item'
                                    } to the cart`}
                                </p>{' '}
                            </>
                        ) : (
                            <p>No Items to Add</p>
                        )}
                    </span>
                </button>

                <button
                    type="button"
                    className={`${
                        cartItems.length
                            ? 'btn-clear'
                            : 'btn-disabled bg-red-200'
                    } w-1/2 ml-1`}
                    disabled={!cartItems.length}
                    onClick={clearCart}
                >
                    Clear Cart
                </button>
            </div>
            <Cart cartItems={cartItems} transactionType={transactionType} />
            <Autocomplete
                className="my-4"
                value={selectedCustomer}
                onChange={(_event, newValue) => {
                    setselectedCustomer(newValue);
                }}
                id="combo-box-demo"
                options={customers}
                noOptionsText="No Customers"
                getOptionLabel={(option) => option.custName}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Select Customer"
                        variant="outlined"
                    />
                )}
            />
            <button
                className={`${
                    cartItems.length ? 'cart-btn' : 'btn-disabled bg-gray-300'
                }`}
                type="button"
                disabled={!cartItems.length}
                onClick={handleTransaction}
            >
                {transactionType === 'sale' ? 'Confirm Sale' : 'Add Order'}
            </button>
        </div>
    );
};

export default ProductTransaction;
