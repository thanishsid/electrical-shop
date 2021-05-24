/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useCustomers } from '../../stores/store';

const EditCustomers = () => {
    const [cname, setName] = useState('');
    const [cphone, setPhone] = useState('');

    const selections = useCustomers((state) => state.selectedCustomers);

    const editCustomer = useCustomers((state) => state.editCustomer);

    const setCustomers = useCustomers((state) => state.setCustomers);

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

        const custObj = {
            custName: cname,
            custPhone: cphone,
        };

        editCustomer(selections[0]._id, custObj);

        setCustomers();
    };

    if (selections.length > 1) {
        return (
            <div className="flex h-full justify-center items-center">
                <h3>Please Select One Customer Only</h3>
            </div>
        );
    }
    if (selections.length < 1) {
        return (
            <div className="flex h-full justify-center items-center">
                <h3>Please Select a Customer to Edit</h3>
            </div>
        );
    }
    return (
        <form className="flex flex-col mx-8 mt-12" onSubmit={handleSubmit}>
            <div>
                <label className="input-label" htmlFor="cust-name">
                    Customer Name
                    <input
                        className="input"
                        id="cust-name"
                        type="text"
                        placeholder="Add Customer Name"
                        value={cname}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label className="input-label" htmlFor="cust-phone">
                    Customer Phone
                    <input
                        className="input"
                        id="cust-phone"
                        type="tel"
                        minLength="10"
                        placeholder="Add Phone Number"
                        value={cphone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </label>
            </div>

            <button className="btn" type="submit">
                Edit Customer
            </button>
        </form>
    );
};

export default EditCustomers;
