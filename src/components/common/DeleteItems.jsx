import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import './DeleteItems.css';

const DeleteItems = ({ btnLabel, items, deleteFunction }) => {
    return (
        <div className="deleteContainer">
            <div className="deleteItems">
                {items.map((row) => {
                    return (
                        // eslint-disable-next-line no-underscore-dangle
                        <h4 key={row._id}>{`${row._id} ${
                            row.prdName || row.custName
                        }`}</h4>
                    );
                })}
            </div>
            <Button
                onClick={deleteFunction}
                variant="contained"
                color="secondary"
                className="deleteBtn"
                startIcon={<DeleteIcon />}
            >
                {`${btnLabel}`}
            </Button>
        </div>
    );
};

export default DeleteItems;
