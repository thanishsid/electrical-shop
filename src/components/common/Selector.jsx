/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useProducts, useCustomers, useSales } from '../../store';

const TableCell = styled.td`
    padding: 0.3rem;
    border: solid 1px gray;
    background: rgb(255, 255, 255);
    text-align: center;
    width: ${(props) => (props.shrink ? '3rem' : '')};
`;

const SelectBox = styled.input`
    transform: scale(1.3);
`;

const Selector = ({ row, type }) => {
    const [selected, setSelected] = useState(false);

    const setProductSelection = useProducts(
        (state) => state.setProductSelection
    );

    const setCustomerSelection = useCustomers(
        (state) => state.setCustomerSelection
    );

    const setSalesSelection = useSales((state) => state.setSalesSelection);
    const productSelection = useProducts((state) => state.selectedProducts);
    const customerSelection = useCustomers((state) => state.selectedCustomers);
    const salesSelection = useSales((state) => state.selectedSales);

    useEffect(() => {
        if (type === 'products') {
            productSelection.forEach((product) => {
                if (product._id === row._id) {
                    setSelected(true);
                }
            });
        } else if (type === 'customers') {
            customerSelection.forEach((customer) => {
                if (customer._id === row._id) {
                    setSelected(true);
                }
            });
        } else if (type === 'sales') {
            salesSelection.forEach((sale) => {
                if (sale._id === row._id) {
                    setSelected(true);
                }
            });
        }
    }, [customerSelection, productSelection, row._id, salesSelection, type]);

    const handleChange = (event) => {
        // event.persist();
        setSelected(event.target.checked);

        if (type === 'products') {
            setProductSelection({
                isSelected: event.target.checked,
                data: row,
            });
        } else if (type === 'customers') {
            setCustomerSelection({
                isSelected: event.target.checked,
                data: row,
            });
        } else if (type === 'sales') {
            setSalesSelection({
                isSelected: event.target.checked,
                data: row,
            });
        }
    };
    return (
        <TableCell shrink>
            <SelectBox
                type="checkbox"
                checked={selected}
                onChange={handleChange}
            />
        </TableCell>
    );
};

export default Selector;
