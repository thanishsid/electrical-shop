import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import styled from 'styled-components';
import {
    FormControl,
    InputLabel,
    Input,
    Button as Btn,
} from '@material-ui/core';
import { useProducts } from '../../stores/store';

// Styled Components
const FormCtrl = styled(FormControl)`
    margin-top: 1rem;
`;
const Form = styled.form`
    margin: 0rem 2rem;
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
`;
const Button = styled(Btn)`
    width: 40%;
    height: 3rem;
    background: ${(props) => (props.bgcolor ? props.bgcolor : '')};
    color: ${(props) => (props.textcolor ? props.textcolor : '')};
    &:hover {
        background: rgb(189, 184, 184);
        color: black;
    }
`;
const ButtonContainer = styled.section`
    margin-top: 2rem;
    display: flex;
    justify-content: space-around;
`;
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
        <Form onSubmit={handleSubmit}>
            <FormCtrl>
                <InputLabel htmlFor="prod-name">Product Name</InputLabel>
                <Input
                    id="prod-name"
                    type="text"
                    placeholder="Add Product Name"
                    value={prdName}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
            </FormCtrl>
            <FormCtrl>
                <InputLabel htmlFor="prod-qty">Quantity</InputLabel>
                <Input
                    id="prod-qty"
                    type="number"
                    inputProps={{ min: '0' }}
                    placeholder="Add Quantity"
                    value={prdQty}
                    onChange={(event) => setQty(event.target.valueAsNumber)}
                />
            </FormCtrl>
            <FormCtrl>
                <InputLabel htmlFor="prod-cost">Cost</InputLabel>
                <Input
                    id="prod-cost"
                    type="number"
                    inputProps={{ step: '0.01', min: '0' }}
                    placeholder="Add Cost"
                    value={prdCost}
                    onChange={(event) => setCost(event.target.valueAsNumber)}
                />
            </FormCtrl>
            <FormCtrl>
                <InputLabel htmlFor="prod-wprice">Wholesale Price</InputLabel>
                <Input
                    id="prod-wprice"
                    type="number"
                    inputProps={{ step: '0.01', min: '0' }}
                    placeholder="Add Wholesale Price"
                    value={prdWhPrice}
                    onChange={(event) => setWprice(event.target.valueAsNumber)}
                />
            </FormCtrl>
            <FormCtrl>
                <InputLabel htmlFor="prod-rprice">Retail Price</InputLabel>
                <Input
                    id="prod-rprice"
                    type="number"
                    inputProps={{ step: '0.01' }}
                    placeholder="Add Retail Price"
                    value={prdRePrice}
                    onChange={(event) => setRprice(event.target.valueAsNumber)}
                />
            </FormCtrl>
            <ButtonContainer>
                <Button
                    variant="contained"
                    type="submit"
                    bgcolor="#1c7f10"
                    textcolor="white"
                    startIcon={<AddIcon />}
                >
                    Add Product
                </Button>

                <Button
                    variant="contained"
                    type="button"
                    bgcolor="#ab003c"
                    textcolor="white"
                    startIcon={<ClearIcon />}
                    onClick={() => clearEntries()}
                >
                    Clear All
                </Button>
            </ButtonContainer>
        </Form>
    );
};

export default AddProducts;
