import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cartItems, transactionType }) => {
    return (
        <div className="flex flex-col overflow-auto stopGrow border-2 justify-center items-center border-gray-300 rounded-md flex-grow mt-4">
            {cartItems.length ? (
                <table className="table-auto border w-full h-full">
                    <thead className="bg-green-100 border text-base">
                        <tr>
                            <th className="h-8">Name</th>
                            <th className="h-8">Qty</th>
                            <th className="h-8">Price</th>
                            <th className="h-8">Net</th>
                            <th className="h-8">Total</th>
                            <th className="h-8">Remove</th>
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
                <p className="font-bold text-gray-700 select-none">
                    Cart Empty
                </p>
            )}
        </div>
    );
};

export default Cart;
