import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: theme.spacing(2),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function TransactionTypeSelector({
    transactionType,
    handleSwitchTransactionType,
}) {
    const classes = useStyles();

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <Select
                value={transactionType}
                onChange={handleSwitchTransactionType}
            >
                <MenuItem value="sale">Sale</MenuItem>
                <MenuItem value="order">Order</MenuItem>
            </Select>
        </FormControl>
    );
}
