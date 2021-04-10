import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import useStore from '../../store';
import './AddProducts.css';

const FormCtrl = withStyles({
    root: {
        marginTop: '1rem',
    },
})(FormControl);

const AddProducts = () => {
    const [name, setName] = useState('');
    const [qty, setQty] = useState('');
    const [cost, setCost] = useState('');
    const [wPrice, setWprice] = useState('');
    const [rPrice, setRprice] = useState('');

    const insertProducts = useStore((state) => state.insertProducts);

    const handleSubmit = (event) => {
        event.preventDefault();

        insertProducts(
            name,
            parseInt(qty, 10),
            parseFloat(cost),
            parseFloat(wPrice),
            parseFloat(rPrice)
        );
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
                    id="prod-na"
                    type="text"
                    placeholder="Add Product Name"
                    value={name}
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
                    value={qty}
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
                    value={cost}
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
                    value={wPrice}
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
                    value={rPrice}
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
