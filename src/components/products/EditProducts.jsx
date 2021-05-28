/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useProducts, useCart } from '../../stores/store';
import { Product } from '../../functions/generalFunctions';

const MessageContainer = ({ message }) => (
    <div className="flex h-full justify-center items-center">
        <p className="font-bold text-gray-700 select-none">{message}</p>
    </div>
);

const EditProducts = () => {
    const [prdName, setName] = useState('');
    const [prdQty, setQty] = useState('');
    const [prdCost, setCost] = useState('');
    const [prdWhPrice, setWprice] = useState('');
    const [prdRePrice, setRprice] = useState('');

    const selections = useProducts((state) => state.selectedProducts);

    const editProduct = useProducts((state) => state.editProduct);

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

        const product = new Product(
            prdName,
            prdQty,
            prdCost,
            prdWhPrice,
            prdRePrice
        );

        editProduct(selections[0]._id, product);

        clearCart();
    };

    if (selections.length > 1) {
        return <MessageContainer message="Please Select Only One Product" />;
    }
    if (selections.length < 1) {
        return <MessageContainer message="Please Select a Product to Edit" />;
    }
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

            <button className="btn mt-2" type="submit">
                Edit Product
            </button>
        </form>
    );
};

export default EditProducts;
