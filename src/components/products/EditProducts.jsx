/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { useProducts, useCart } from '../../stores/store';

const FormCtrl = styled(FormControl)`
    margin-top: 1rem;
`;

const Form = styled.form`
    margin-left: 2rem;
    margin-right: 2rem;
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
`;

const MessageContainer = styled.section`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const EditProducts = () => {
    const [pname, setName] = useState('');
    const [pqty, setQty] = useState('');
    const [pcost, setCost] = useState('');
    const [pwPrice, setWprice] = useState('');
    const [prPrice, setRprice] = useState('');

    const selections = useProducts((state) => state.selectedProducts);

    const editProduct = useProducts((state) => state.editProduct);

    const refreshProductSelection = useProducts(
        (state) => state.refreshProductSelection
    );
    const clearCart = useCart((state) => state.clearCart);

    useEffect(() => {
        const fillEdits = async () => {
            const product = await selections[0];
            if (product) {
                setName(product.prdName);
                setQty(product.prdQty);
                setCost(product.prdCost);
                setWprice(product.prdWhPrice);
                setRprice(product.prdRePrice);
            }
        };

        fillEdits();
    }, [selections]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const prdObj = {
            prdName: pname.trim(),
            prdQty: parseInt(pqty, 10),
            prdCost: parseFloat(pcost),
            prdWhPrice: parseFloat(pwPrice),
            prdRePrice: parseFloat(prPrice),
        };

        editProduct(selections[0]._id, prdObj);

        refreshProductSelection({ ...selections[0], ...prdObj });

        clearCart();
    };

    if (selections.length > 1) {
        return (
            <MessageContainer>
                <h3>Please Select One Product Only</h3>
            </MessageContainer>
        );
    }
    if (selections.length < 1) {
        return (
            <MessageContainer>
                <h3>Please Select a Product to Edit</h3>
            </MessageContainer>
        );
    }
    return (
        <Form onSubmit={handleSubmit}>
            <FormCtrl>
                <InputLabel disableAnimation htmlFor="prod-name">
                    Product Name
                </InputLabel>
                <Input
                    id="prod-name"
                    type="text"
                    placeholder="Add Product Name"
                    value={pname}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
            </FormCtrl>
            <FormCtrl>
                <InputLabel disableAnimation htmlFor="prod-qty">
                    Quantity
                </InputLabel>
                <Input
                    id="prod-qty"
                    type="number"
                    inputProps={{ min: '0' }}
                    placeholder="Add Quantity"
                    value={pqty}
                    onChange={(event) => setQty(event.target.value)}
                />
            </FormCtrl>
            <FormCtrl>
                <InputLabel disableAnimation htmlFor="prod-cost">
                    Cost
                </InputLabel>
                <Input
                    id="prod-cost"
                    type="number"
                    inputProps={{ step: '0.01', min: '0' }}
                    placeholder="Add Cost"
                    value={pcost}
                    onChange={(event) => setCost(event.target.value)}
                />
            </FormCtrl>
            <FormCtrl>
                <InputLabel disableAnimation htmlFor="prod-wprice">
                    Wholesale Price
                </InputLabel>
                <Input
                    id="prod-wprice"
                    type="number"
                    inputProps={{ step: '0.01', min: '0' }}
                    placeholder="Add Wholesale Price"
                    value={pwPrice}
                    onChange={(event) => setWprice(event.target.value)}
                />
            </FormCtrl>
            <FormCtrl>
                <InputLabel disableAnimation htmlFor="prod-rprice">
                    Retail Price
                </InputLabel>
                <Input
                    id="prod-rprice"
                    type="number"
                    inputProps={{ step: '0.01' }}
                    placeholder="Add Retail Price"
                    value={prPrice}
                    onChange={(event) => setRprice(event.target.value)}
                />
            </FormCtrl>

            <Button
                style={{ marginTop: '1rem' }}
                variant="contained"
                type="submit"
            >
                Edit Product
            </Button>
        </Form>
    );
};

export default EditProducts;
