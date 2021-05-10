import React, { useState } from 'react';
import styled from 'styled-components';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { useCustomers } from '../../store';

const FormCtrl = styled(FormControl)`
    margin-top: 1rem;
`;

const Form = styled.form`
    margin: 0rem 2rem;
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
`;

const ButtonContainer = styled.section`
    margin-top: 2rem;
    display: flex;
    justify-content: space-around;
`;

const AddCustomers = () => {
    const [custName, setCustName] = useState('');
    const [custPhone, setCustPhone] = useState('');

    const insertCustomer = useCustomers((state) => state.insertCustomers);
    const setCustomers = useCustomers((state) => state.setCustomers);

    const handleSubmit = (event) => {
        event.preventDefault();

        const customer = {
            custName,
            custPhone,
        };

        insertCustomer(customer);
        setCustomers();
    };

    const clearEntries = () => {
        setCustName('');
        setCustPhone('');
    };
    return (
        <Form onSubmit={handleSubmit}>
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

            <ButtonContainer>
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
            </ButtonContainer>
        </Form>
    );
};

export default AddCustomers;
