import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteContainer = styled.section`
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
`;

const Items = styled.section`
    height: 100%;
    overflow-y: auto;
`;

const DeleteButton = styled(Button)`
    width: 100%;
    margin-top: 1rem;
    height: 4vh;
`;

const DeleteItems = ({ btnLabel, items, deleteFunction, updateFunctions }) => {
    const handleDelete = () => {
        deleteFunction();
        updateFunctions[0]();
        updateFunctions[1]();
    };

    return (
        <DeleteContainer>
            <Items>
                {items.map((row) => {
                    return (
                        // eslint-disable-next-line no-underscore-dangle
                        <h4 key={row._id}>{`${row._id} ${
                            row.prdName || row.custName || row.time
                        }`}</h4>
                    );
                })}
            </Items>
            <DeleteButton
                onClick={handleDelete}
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
            >
                {`${btnLabel}`}
            </DeleteButton>
        </DeleteContainer>
    );
};

export default DeleteItems;
