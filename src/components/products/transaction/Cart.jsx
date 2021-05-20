import React from 'react';
import styled from 'styled-components';
import CartItem from './CartItem';

const CartContainer = styled.section`
    margin-top: 1rem;
    height: 100%;
`;

const Table = styled.table`
    border: solid 2px rgb(161, 155, 155);
    border-radius: 0.5em;
    width: 100%;
    height: 100%;
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
    height: 100%;
    overflow-y: auto;
`;

const CartTableRow = styled.tr`
    display: table;
    width: 100%;
    table-layout: fixed;
`;

const Cart = ({ cartItems, transactionType }) => {
    return (
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
    );
};

export default Cart;
