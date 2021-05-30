/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled from 'styled-components';
import useStore from '../../stores/store';
import SaleItem from './SaleItem';

// styled components
const SaleDetailsContainer = styled.section`
    padding: 1rem;
`;
const Table = styled.section`
    display: table;
    width: 100%;
`;
const TableRow = styled.section`
    display: flex;
    margin-bottom: ${(props) => (props.gapBelow ? '1rem' : '0rem')};
`;
const TableColumn = styled.section`
    float: left;
    text-align: center;
    width: 25%;
    display: table-column;
    border: 1px solid #ccc;
`;
// styled components

const SaleDetails = () => {
    const selectedSales = useStore((state) => state.selectedSales);

    return (
        <SaleDetailsContainer>
            {selectedSales.length > 0 && (
                <Table>
                    <TableRow gapBelow>
                        <TableColumn>
                            <p>ID</p>
                        </TableColumn>
                        <TableColumn>
                            <p>Time</p>
                        </TableColumn>
                        <TableColumn>
                            <p>Customer</p>
                        </TableColumn>
                        <TableColumn>
                            <p>Items</p>
                        </TableColumn>
                    </TableRow>
                    {selectedSales.map((sale) => (
                        <SaleItem key={sale._id} sale={sale} />
                    ))}
                </Table>
            )}
        </SaleDetailsContainer>
    );
};

export default SaleDetails;
