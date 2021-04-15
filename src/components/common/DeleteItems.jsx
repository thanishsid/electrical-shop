import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
    button: {
        width: '100%',
        marginTop: '2rem',
        marginRight: '2rem',
    },
}));

const DeleteItems = ({ btnLabel, items, deleteFunction }) => {
    const classes = useStyles();

    return (
        <div
            style={{
                border: '2px solid #A19B9B',
                margin: '1rem 0rem',
                padding: '1rem',
                borderRadius: '1em',
            }}
        >
            <div style={{ overflowY: 'scroll', height: '69vh' }}>
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
                className={classes.button}
                startIcon={<DeleteIcon />}
            >
                {`${btnLabel}`}
            </Button>
        </div>
    );
};

export default DeleteItems;
