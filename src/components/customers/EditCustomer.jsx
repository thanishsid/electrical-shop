import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { useCustomers } from '../../store';

const Form = styled.form`
    margin-left: 2rem;
    margin-right: 2rem;
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
`;

const FormCtrl = styled(FormControl)`
    margin-top: 1rem;
`;

const EditButton = styled(Button)`
    margin-top: 1rem;
`;

const MessageContainer = styled.section`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const EditCustomers = () => {
    const [cname, setName] = useState('');
    const [cphone, setPhone] = useState('');

    const selections = useCustomers((state) => state.selectedCustomers);

    const editCustomer = useCustomers((state) => state.editCustomer);

    useEffect(() => {
        const fillEdits = async () => {
            const customer = await selections[0];
            if (customer) {
                setName(customer.custName);
                setPhone(customer.custPhone);
            }
        };

        fillEdits();
    }, [selections]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (selections.length === 1) {
            // eslint-disable-next-line no-underscore-dangle
            editCustomer(selections[0]._id, {
                custName: cname,
                custPhone: cphone,
            });
        }
    };

    if (selections.length > 1) {
        return (
            <MessageContainer>
                <h3>Please Select One Customer Only</h3>;
            </MessageContainer>
        );
    }
    if (selections.length < 1) {
        return (
            <MessageContainer>
                <h3>Please Select a Customer to Edit</h3>;
            </MessageContainer>
        );
    }
    return (
        <Form onSubmit={handleSubmit}>
            <FormCtrl>
                <InputLabel htmlFor="cust-name">Customer Name</InputLabel>
                <Input
                    id="cust-name"
                    type="text"
                    placeholder="Add Customer Name"
                    value={cname}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
            </FormCtrl>
            <FormCtrl>
                <InputLabel htmlFor="cust-phone">Customer Phone</InputLabel>
                <Input
                    id="cust-phone"
                    type="tel"
                    inputProps={{ minLength: '10' }}
                    placeholder="Add Phone Number"
                    value={cphone}
                    onChange={(event) => setPhone(event.target.value)}
                />
            </FormCtrl>

            <EditButton variant="contained" type="submit">
                Edit Customer
            </EditButton>
        </Form>
    );
};

export default EditCustomers;
