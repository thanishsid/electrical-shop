import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import useStore from '../../store';
import './AddCustomers.css';

const FormCtrl = withStyles({
    root: {
        marginTop: '1rem',
    },
})(FormControl);

const AddCustomers = () => {
    const [custName, setCustName] = useState('');
    const [custPhone, setCustPhone] = useState('');

    const insertCustomer = useStore((state) => state.insertCustomers);

    const handleSubmit = (event) => {
        event.preventDefault();

        const customer = {
            custName,
            custPhone,
            custOrders: [],
            custSales: [],
        };

        insertCustomer(customer);
    };

    const clearEntries = () => {
        setCustName('');
        setCustPhone('');
    };
    return (
        <form className="addCustomersForm" onSubmit={handleSubmit}>
            <FormCtrl>
                <InputLabel htmlFor="cust-name">Customer Name</InputLabel>
                <Input
                    id="cust-name"
                    type="text"
                    placeholder="Add Customer Name"
                    value={custName}
                    onChange={(event) => setCustName(event.target.value)}
                    required
                />
            </FormCtrl>
            <FormCtrl>
                <InputLabel htmlFor="cust-phone">
                    Customer Phone Number
                </InputLabel>
                <Input
                    id="cust-phone"
                    type="tel"
                    inputProps={{ min: '0' }}
                    placeholder="Add Customer Phone Number"
                    value={custPhone}
                    onChange={(event) => setCustPhone(event.target.value)}
                />
            </FormCtrl>

            <div className="btnContainer">
                <Button variant="contained" type="submit" className="btn">
                    Add Customer
                </Button>

                <Button
                    variant="contained"
                    type="button"
                    className="btn"
                    onClick={() => clearEntries()}
                >
                    Clear Entries
                </Button>
            </div>
        </form>
    );
};

export default AddCustomers;
