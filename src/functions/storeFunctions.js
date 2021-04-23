export const removeItems = (currentSelections, itemToRemove) => {
    const newItems = currentSelections.filter(
        // eslint-disable-next-line no-underscore-dangle
        (rows) => rows._id !== itemToRemove._id
    );
    return newItems;
};

export const addCartItem = (currentItems, itemsToAdd) => {
    const newItems = itemsToAdd.filter(
        (item) =>
            // eslint-disable-next-line no-underscore-dangle
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
        // eslint-disable-next-line no-underscore-dangle
        if (item._id === itemToChange._id) {
            return { ...item, prdQty: quantity };
        }

        return item;
    });

    return changedItems;
};

export const editSalePrice = (currentItems, itemToChange, amount) => {
    const changedItems = currentItems.map((item) => {
        // eslint-disable-next-line no-underscore-dangle
        if (item._id === itemToChange._id) {
            return { ...item, salePrice: amount };
        }

        return item;
    });

    return changedItems;
};
