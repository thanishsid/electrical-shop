/* eslint-disable no-underscore-dangle */
export const removeItems = (currentSelections, itemToRemove) => {
    const newItems = currentSelections.filter(
        (rows) => rows._id !== itemToRemove._id
    );
    return newItems;
};

export const removeItem = (
    targetState,
    currentItems,
    deleteItemId,
    deleteConfirmation
) => {
    if (deleteConfirmation === 1) {
        const filtereditems = currentItems.filter(
            ({ _id }) => _id !== deleteItemId
        );

        return { [targetState]: filtereditems };
    }

    return { [targetState]: currentItems };
};

export const updateProduct = (currentProducts, productId, updatedProduct) => {
    const updatedProducts = currentProducts.map((product) =>
        product._id === productId ? { ...product, ...updatedProduct } : product
    );

    return { products: updatedProducts };
};

export const addCartItem = (currentItems, itemsToAdd) => {
    const newItems = itemsToAdd.filter(
        (item) =>
            currentItems.every((itm) => itm._id !== item._id) &&
            item.prdQty !== 0
    );

    if (newItems) {
        const resetQty = newItems.map((item) => {
            const origQty = item.prdQty;

            return { ...item, prdQty: 1, origQty, salePrice: null };
        });

        const newCart = [...currentItems, ...resetQty];

        return newCart;
    }

    return currentItems;
};

export const changeQty = (currentItems, itemToChange, type) => {
    const { origQty } = itemToChange;
    let quantity = itemToChange.prdQty;

    if (type === 'inc' && quantity < origQty) {
        quantity += 1;
    } else if (type === 'dec' && quantity > 1) {
        quantity -= 1;
    }

    const changedItems = currentItems.map((item) => {
        if (item._id === itemToChange._id) {
            return { ...item, prdQty: quantity };
        }

        return item;
    });

    return changedItems;
};

export const editSalePrice = (currentItems, itemToChange, amount) => {
    const changedItems = currentItems.map((item) => {
        if (item._id === itemToChange._id) {
            return { ...item, salePrice: amount };
        }

        return item;
    });

    return changedItems;
};

export const updatePrdQty = ({ products: currentProducts }, newData) => {
    const updatedProducts = currentProducts.map((product) => {
        let updatedProduct = { ...product };

        for (let i = 0; i < newData.length; i += 1) {
            if (product._id === newData[i]._id) {
                updatedProduct = {
                    ...product,
                    prdQty: product.prdQty - newData[i].prdQty,
                };
            }
        }

        return updatedProduct;
    });

    return { products: updatedProducts };
};

export const refreshMultipleQty = (currentSelections, refreshData) => {
    const updatedSelections = currentSelections.map((selection) => {
        for (let i = 0; i < refreshData.length; i += 1) {
            if (selection._id === refreshData[i]._id) {
                return {
                    ...selection,
                    prdQty: selection.prdQty - refreshData[i].prdQty,
                };
            }
        }
        return selection;
    });

    return { selectedProducts: updatedSelections };
};
