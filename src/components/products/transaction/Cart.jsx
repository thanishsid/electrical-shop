import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cartItems, transactionType }) => {
    return (
        <div className="cartContainer">
            {cartItems.length ? (
                <table className="table w-full">
                    <thead className="">
                        <tr>
                            <th className="cart-header">Name</th>
                            <th className="cart-header">Qty</th>
                            <th className="cart-header">Price</th>
                            <th className="cart-header">Net</th>
                            <th className="cart-header">Total</th>
                            <th className="cart-header">Remove</th>
                        </tr>
                    </thead>
                    <tbody className="font-semibold">
                        {cartItems.length !== 0 &&
                            cartItems.map((item) => (
                                <CartItem
                                    key={item.prdName}
                                    item={item}
                                    transactionType={transactionType}
                                />
                            ))}
                    </tbody>
                </table>
            ) : (
                <div className="flex h-full justify-center items-center">
                    <p className="font-bold text-center text-gray-700 select-none">
                        Cart Empty
                    </p>
                </div>
            )}
        </div>
    );
};

export default Cart;
