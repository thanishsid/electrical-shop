import React, { useState } from 'react';
import { useCustomers } from '../../stores/store';

const AddCustomers = () => {
    const [custName, setCustName] = useState('');
    const [custPhone, setCustPhone] = useState('');

    const insertCustomer = useCustomers((state) => state.insertCustomers);
    const setCustomers = useCustomers((state) => state.setCustomers);

    const clearEntries = () => {
        setCustName('');
        setCustPhone('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const customer = {
            custName,
            custPhone,
        };

        insertCustomer(customer);
        setCustomers();
        clearEntries();
    };

    return (
        <form className="mx-8 mt-12 flex flex-col" onSubmit={handleSubmit}>
            <div>
                <label className="input-label" htmlFor="cust-name">
                    Customer Name
                    <input
                        className="input"
                        id="cust-name"
                        type="text"
                        placeholder="Add Customer Name"
                        value={custName}
                        onChange={(event) => setCustName(event.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label className="input-label" htmlFor="cust-phone">
                    Customer Phone Number
                    <input
                        className="input"
                        id="cust-phone"
                        type="tel"
                        minLength="10"
                        placeholder="Add Customer Phone Number"
                        value={custPhone}
                        onChange={(event) => setCustPhone(event.target.value)}
                        required
                    />
                </label>
            </div>

            <div className="flex justify-around">
                <button className="btn" type="submit">
                    Add Customer
                </button>

                <button
                    className="btn-danger"
                    type="button"
                    onClick={() => clearEntries()}
                >
                    Clear Entries
                </button>
            </div>
        </form>
    );
};

export default AddCustomers;
