import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { useProducts } from '../../store';
import './AddProducts.css';

const FormCtrl = withStyles({
    root: {
        marginTop: '1rem',
    },
})(FormControl);

const AddProducts = () => {
    const [prdName, setName] = useState('');
    const [prdQty, setQty] = useState('');
    const [prdCost, setCost] = useState('');
    const [prdWhPrice, setWprice] = useState('');
    const [prdRePrice, setRprice] = useState('');

    const insertProducts = useProducts((state) => state.insertProducts);

    const handleSubmit = (event) => {
        event.preventDefault();

        const product = {
            prdName: prdName.trim(),
            prdQty: parseInt(prdQty, 10),
            prdCost: parseFloat(prdCost),
            prdWhPrice: parseFloat(prdWhPrice),
            prdRePrice: parseFloat(prdRePrice),
        };

        insertProducts(product);
    };

    const clearEntries = () => {
        setName('');
        setQty('');
        setRprice('');
        setWprice('');
        setCost('');
    };
    return (
        <form className="addProductsForm" onSubmit={handleSubmit}>
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
                    onChange={(event) => setQty(event.target.value)}
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
                    onChange={(event) => setCost(event.target.value)}
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
                    onChange={(event) => setWprice(event.target.value)}
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
                    onChange={(event) => setRprice(event.target.value)}
                />
            </FormCtrl>
            <div className="btnContainer">
                <Button variant="contained" type="submit" className="btn">
                    Add Product
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

export default AddProducts;
