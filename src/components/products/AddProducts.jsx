import React, { useState } from 'react';
// import styled from 'styled-components';
// import { InputLabel, Input, Button as Btn } from '@material-ui/core';
import { useProducts } from '../../stores/store';

// Styled Components
// const FormCtrl = styled(FormControl)`
//     margin-top: 1rem;
// `;
// const Form = styled.form`
//     margin: 0rem 2rem;
//     margin-top: 3rem;
//     display: flex;
//     flex-direction: column;
// `;

// const Button = styled(Btn)`
//     width: 40%;
//     height: 3rem;
//     background: ${(props) => (props.bgcolor ? props.bgcolor : '')};
//     color: ${(props) => (props.textcolor ? props.textcolor : '')};
//     &:hover {
//         background: rgb(189, 184, 184);
//         color: black;
//     }
// `;
// const ButtonContainer = styled.section`
//     margin-top: 2rem;
//     display: flex;
//     justify-content: space-around;
// `;
// Styled Components

const AddProducts = () => {
    const [prdName, setName] = useState('');
    const [prdQty, setQty] = useState('');
    const [prdCost, setCost] = useState('');
    const [prdWhPrice, setWprice] = useState('');
    const [prdRePrice, setRprice] = useState('');

    const insertProducts = useProducts((state) => state.insertProducts);

    const clearEntries = () => {
        setName('');
        setQty('');
        setRprice('');
        setWprice('');
        setCost('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const product = {
            prdName: prdName.trim(),
            prdQty,
            prdCost,
            prdWhPrice,
            prdRePrice,
        };

        insertProducts(product);

        clearEntries();
    };

    return (
        <form className="mx-8 mt-12 flex flex-col" onSubmit={handleSubmit}>
            <label className="input-label" htmlFor="prod-name">
                Product Name
                <input
                    className="input"
                    id="prod-name"
                    type="text"
                    placeholder="Add Product Name"
                    value={prdName}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
            </label>

            <label className="input-label" htmlFor="prod-qty">
                Quantity
                <input
                    className="input"
                    id="prod-qty"
                    type="number"
                    min="0"
                    placeholder="Add Quantity"
                    value={prdQty}
                    onChange={(event) => setQty(event.target.valueAsNumber)}
                />
            </label>

            <label className="input-label" htmlFor="prod-cost">
                Cost
                <input
                    className="input"
                    id="prod-cost"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Add Cost"
                    value={prdCost}
                    onChange={(event) => setCost(event.target.valueAsNumber)}
                />
            </label>

            <label className="input-label" htmlFor="prod-wprice">
                Wholesale Price
                <input
                    className="input"
                    id="prod-wprice"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Add Wholesale Price"
                    value={prdWhPrice}
                    onChange={(event) => setWprice(event.target.valueAsNumber)}
                />
            </label>

            <label className="input-label" htmlFor="prod-rprice">
                Retail Price
                <input
                    className="input"
                    id="prod-rprice"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Add Retail Price"
                    value={prdRePrice}
                    onChange={(event) => setRprice(event.target.valueAsNumber)}
                />
            </label>

            <div className="mt-2 flex justify-center">
                <button className="btn w-1/2 mr-2" type="submit">
                    Add Product
                </button>

                <button
                    className="btn-clear w-1/2 ml-2"
                    type="button"
                    onClick={() => clearEntries()}
                >
                    Clear All
                </button>
            </div>
        </form>
    );
};

export default AddProducts;
