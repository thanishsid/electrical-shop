/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import ReturnItem from './ReturnItem';
import { useSales } from '../../store';

// styled components
const ReturnContainer = styled.section`
    padding: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Table = styled.section`
    display: table;
    width: 100%;
    height: 100%;
`;
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

const ReturnButton = styled(Button)`
    width: 100%;
    margin-top: 1rem;
    height: 4vh;
`;
// styled components

const ReturnSale = () => {
    const selectedSales = useSales((state) => state.selectedSales);
    const [returnSale, setReturnSale] = useState([]);

    useEffect(() => {
        if (selectedSales.length) {
            setReturnSale(selectedSales[0].items);
        }
    }, [selectedSales]);

    const changeReturnQty = (id, qty) => {
        const targetSale = returnSale.map((item) => {
            if (item._id === id) {
                return { ...item, returnQty: qty };
            }
            return item;
        });
        setReturnSale(targetSale);
    };

    if (selectedSales.length < 1) {
        return <h3>Please Select a Sale to Return</h3>;
    }
    if (selectedSales.length > 1) {
        return <h3>Please Select Only One Sale</h3>;
    }
    return (
        <ReturnContainer>
            <Table>
                <TableRow>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Purchased Qty</TableColumn>
                    <TableColumn>Sale Price</TableColumn>
                    <TableColumn>Return Qty</TableColumn>
                </TableRow>
                {returnSale.length &&
                    returnSale.map((item) => (
                        <ReturnItem
                            item={item}
                            changeReturnQty={changeReturnQty}
                            key={item._id}
                        />
                    ))}
            </Table>
            <ReturnButton variant="contained" color="secondary">
                Return Items
            </ReturnButton>
        </ReturnContainer>
    );
};

export default ReturnSale;
