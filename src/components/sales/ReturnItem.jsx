/* eslint-disable no-underscore-dangle */
import React from 'react';
import Repeatable from 'react-repeatable';
import styled from 'styled-components';

// styled components
const TableRow = styled.section`
    display: flex;
`;
const TableColumn = styled.section`
    float: left;
    text-align: center;
    width: 25%;
    display: table-column;
    border: 1px solid #ccc;
`;
const ReturnQtyContainer = styled(TableColumn)`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ReturnQtyIndicator = styled.p`
    margin-left: 1rem;
    margin-right: 1rem;
`;
// styled components

const ReturnItem = ({ item, changeReturnQty }) => {
    const returnQty = item.returnQty ?? 0;

    const handleChange = (type) => {
        if (type === 'inc' && item.prdQty > returnQty) {
            changeReturnQty(item._id, returnQty + 1);
        } else if (type === 'dec' && returnQty > 0) {
            changeReturnQty(item._id, returnQty - 1);
        }
    };

    return (
        <TableRow key={item.prdName}>
            <TableColumn>{item.prdName}</TableColumn>
            <TableColumn>{item.prdQty}</TableColumn>
            <TableColumn>{item.salePrice}</TableColumn>
            <ReturnQtyContainer>
                <Repeatable
                    tag="button"
                    type="button"
                    onHold={() => handleChange('dec')}
                    onPress={() => handleChange('dec')}
                >
                    -
                </Repeatable>
                <ReturnQtyIndicator>{returnQty}</ReturnQtyIndicator>
                <Repeatable
                    tag="button"
                    type="button"
                    onHold={() => handleChange('inc')}
                    onPress={() => handleChange('inc')}
                >
                    +
                </Repeatable>
            </ReturnQtyContainer>
        </TableRow>
    );
};

export default ReturnItem;
