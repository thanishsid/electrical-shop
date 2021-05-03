/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled from 'styled-components';

// styled components
const Table = styled.section`
    display: table;
    width: 100%;
`;
const TableRow = styled.section`
    display: ${(props) => (props.hide ? 'none' : 'flex')};
    margin-bottom: ${(props) =>
        props.spaceBottom ? props.spaceBottom : '0rem'};
`;
const TableColumn = styled.section`
    float: left;
    text-align: center;
    width: ${(props) => (props.maxWidth ? '100%' : '25%')};
    display: table-column;
    border: 1px solid #ccc;
`;
const ViewButtonContainer = styled.section`
    float: left;
    text-align: center;
    width: 25%;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ViewButton = styled.button`
    border: 2px solid rgba(0, 0, 0, 0.404);
    border-radius: 0.5em;
    height: 50%;
`;
// styled components

const SaleItem = ({ sale }) => {
    const [hideItems, sethideItems] = React.useState(true);
    return (
        <>
            <TableRow>
                <TableColumn>
                    <p>{sale._id}</p>
                </TableColumn>
                <TableColumn>
                    <p>{sale.time}</p>
                </TableColumn>
                <TableColumn>
                    <p>
                        {sale.customer ? sale.customer.customerName : 'Normal'}
                    </p>
                </TableColumn>
                <ViewButtonContainer>
                    <ViewButton
                        type="button"
                        onClick={() => sethideItems(!hideItems)}
                    >
                        View Items
                    </ViewButton>
                </ViewButtonContainer>
            </TableRow>
            <TableRow spaceBottom="1rem">
                <Table>
                    <TableRow hide={hideItems}>
                        <TableColumn maxWidth>Name</TableColumn>
                        <TableColumn maxWidth>Qty</TableColumn>
                        <TableColumn maxWidth>Sale Price</TableColumn>
                    </TableRow>
                    {sale.items.map((item) => (
                        <TableRow hide={hideItems} key={item._id}>
                            <TableColumn maxWidth>{item.prdName}</TableColumn>
                            <TableColumn maxWidth>{item.prdQty}</TableColumn>
                            <TableColumn maxWidth>{item.salePrice}</TableColumn>
                        </TableRow>
                    ))}
                </Table>
            </TableRow>
        </>
    );
};

export default SaleItem;
