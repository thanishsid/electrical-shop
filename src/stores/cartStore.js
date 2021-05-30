import {
    removeItems,
    addCartItems,
    changeQty,
    editSalePrice,
} from '../functions/storeFunctions';

const cartStore = (set) => ({
    items: [],
    addItems: (transactionType, items) =>
        set((state) => ({
            items: addCartItems(transactionType, state.items, items),
        })),
    changeQuantity: (transactionType, itemToChange, type) =>
        set((state) => ({
            items: changeQty(transactionType, state.items, itemToChange, type),
        })),
    changeSalePrice: (itemToChange, amount) =>
        set((state) => ({
            items: editSalePrice(state.items, itemToChange, amount),
        })),
    removeItem: (item) =>
        set((state) => ({
            items: removeItems(state.items, item),
        })),
    clearCart: () => set(() => ({ items: [] })),
});

export default cartStore;
