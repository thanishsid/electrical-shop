import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { useProducts } from '../../store';

const FormCtrl = withStyles({
    root: {
        marginTop: '1rem',
    },
})(FormControl);

const EditProducts = () => {
    const [pname, setName] = useState('');
    const [pqty, setQty] = useState('');
    const [pcost, setCost] = useState('');
    const [pwPrice, setWprice] = useState('');
    const [prPrice, setRprice] = useState('');

    const selections = useProducts((state) => state.selectedProducts);

    const editProduct = useProducts((state) => state.editProduct);

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

        if (selections.length === 1) {
            // eslint-disable-next-line no-underscore-dangle
            editProduct(selections[0]._id, {
                prdName: pname.trim(),
                prdQty: parseInt(pqty, 10),
                prdCost: parseFloat(pcost),
                prdWhPrice: parseFloat(pwPrice),
                prdRePrice: parseFloat(prPrice),
            });
        }
    };

    if (selections.length > 1) {
        return <h3>Please Select One Product Only</h3>;
    }
    if (selections.length < 1) {
        return <h3>Please Select a Product to Edit</h3>;
    }
    return (
        <form
            style={{
                marginLeft: '2rem',
                marginTop: '3rem',
                display: 'flex',
                flexDirection: 'column',
            }}
            onSubmit={handleSubmit}
        >
            <FormCtrl>
                <InputLabel htmlFor="prod-name">Product Name</InputLabel>
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
                <InputLabel htmlFor="prod-qty">Quantity</InputLabel>
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
                <InputLabel htmlFor="prod-cost">Cost</InputLabel>
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
                <InputLabel htmlFor="prod-wprice">Wholesale Price</InputLabel>
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
                <InputLabel htmlFor="prod-rprice">Retail Price</InputLabel>
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
        </form>
    );
};

export default EditProducts;
