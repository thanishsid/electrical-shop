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

export const removeOrigQty = (items) => {
    const compactItems = items.map((item) => {
        const compactItem = { ...item };
        delete compactItem.origQty;
        return compactItem;
    });

    return compactItems;
};

export const updateProduct = (currentProducts, productId, updatedProduct) => {
    const updatedProducts = currentProducts.map((product) =>
        product._id === productId ? { ...product, ...updatedProduct } : product
    );

    return { products: updatedProducts };
};

export const addCartItems = (transactionType, currentItems, itemsToAdd) => {
    let updatedCart = currentItems;

    if (transactionType === 'sale') {
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

            updatedCart = newCart;
        }
    } else if (transactionType === 'order') {
        const newItems = itemsToAdd.filter((item) =>
            currentItems.every((itm) => itm._id !== item._id)
        );

        if (newItems) {
            const resetQty = newItems.map((item) => {
                return { ...item, prdQty: 1, salePrice: null };
            });

            const newCart = [...currentItems, ...resetQty];

            updatedCart = newCart;
        }
    }

    return updatedCart;
};

export const changeQty = (
    transactionType,
    currentItems,
    itemToChange,
    type
) => {
    let changedItems = currentItems;

    if (transactionType === 'sale') {
        const { origQty } = itemToChange;
        let quantity = itemToChange.prdQty;

        if (type === 'inc' && quantity < origQty) {
            quantity += 1;
        } else if (type === 'dec' && quantity > 1) {
            quantity -= 1;
        }

        changedItems = currentItems.map((item) => {
            if (item._id === itemToChange._id) {
                return { ...item, prdQty: quantity };
            }

            return item;
        });
    } else if (transactionType === 'order') {
        let quantity = itemToChange.prdQty;

        if (type === 'inc') {
            quantity += 1;
        } else if (type === 'dec' && quantity > 1) {
            quantity -= 1;
        }

        changedItems = currentItems.map((item) => {
            if (item._id === itemToChange._id) {
                return { ...item, prdQty: quantity };
            }

            return item;
        });
    }

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

export const updatePrdQty = (products, newData) => {
    const updatedProducts = products.map((product) => {
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

export class TransactionItem {
    constructor(type, items, customer) {
        let transactionItems = items;

        if (type === 'sale') {
            transactionItems = removeOrigQty(items);
        }

        const saleCustomer = customer
            ? { customerId: customer._id, customerName: customer.custName }
            : null;

        this.items = transactionItems;
        this.customer = saleCustomer;
        this.time = new Date().toISOString();
    }
}
