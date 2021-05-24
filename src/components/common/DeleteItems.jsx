import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteItems = ({ btnLabel, items, deleteFunction, updateFunction }) => {
    const handleDelete = () => {
        deleteFunction();
        updateFunction();
    };

    return (
        <div className="h-full flex flex-col p-4">
            <div className="h-full overflow-y-auto">
                {items.map((row) => {
                    return (
                        // eslint-disable-next-line no-underscore-dangle
                        <h4 key={row._id}>{`${row._id} ${
                            row.prdName || row.custName || row.time
                        }`}</h4>
                    );
                })}
            </div>
            <Button
                className="w-full mt-4 h-8"
                onClick={handleDelete}
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
            >
                {`${btnLabel}`}
            </Button>
        </div>
    );
};

export default DeleteItems;
