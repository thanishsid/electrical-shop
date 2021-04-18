import create from 'zustand';
import { getData, dbFunction } from './dbcontroller/renderer';

const removeSelection = (currentSelections, rowToRemove) => {
    const newSelections = currentSelections.filter(
        // eslint-disable-next-line no-underscore-dangle
        (rows) => rows._id !== rowToRemove._id
    );
    return newSelections;
};

export const useProducts = create((set) => ({
    products: [],
    setProducts: async () => {
        const data = await getData('products');
        set(() => ({ products: data }));
    },
    insertProducts: async (product) => {
        const data = await dbFunction('insert', 'products', product);
        console.log(data);
    },
    editProduct: async (id, productData) => {
        const data = await dbFunction('edit', 'products', {
            id,
            newData: productData,
        });
        console.log(data);
    },
    deleteProduct: async (id) => {
        const data = await dbFunction('delete', 'products', id);
        console.log(data);
    },
    selectedProducts: [],
    setProductSelection: ({ isSelected, data }) => {
        if (isSelected) {
            set((state) => ({
                selectedProducts: [...state.selectedProducts, data],
            }));
        } else {
            set((state) => ({
                selectedProducts: removeSelection(state.selectedProducts, data),
            }));
        }
    },
    clearSelectedProducts: () => {
        set(() => ({ selectedProducts: [] }));
    },
}));

export const useCustomers = create((set) => ({
    customers: [],
    setCustomers: async () => {
        const data = await getData('customers');
        set(() => ({ customers: data }));
    },
    insertCustomers: async (customer) => {
        const data = await dbFunction('insert', 'customers', customer);
        console.log(data);
    },
    deleteCustomer: async (id) => {
        const data = await dbFunction('delete', 'customers', id);
        console.log(data);
    },
    editCustomer: async (id, customerData) => {
        const data = await dbFunction('edit', 'customers', {
            id,
            newData: customerData,
        });
        console.log(data);
    },
    selectedCustomers: [],
    setCustomerSelection: ({ isSelected, data }) => {
        if (isSelected) {
            set((state) => ({
                selectedCustomers: [...state.selectedCustomers, data],
            }));
        } else {
            set((state) => ({
                selectedCustomers: removeSelection(
                    state.selectedCustomers,
                    data
                ),
            }));
        }
    },
    clearSelectedCustomers: () => {
        set(() => ({ selectedCustomers: [] }));
    },
}));

const addCartItem = (currentItems, itemsToAdd) => {
    const newItems = itemsToAdd.filter(
        // eslint-disable-next-line no-underscore-dangle
        (item) => currentItems.every((itm) => itm._id !== item._id)
    );

    if (newItems) {
        return [...currentItems, ...newItems];
    }

    return currentItems;
};

const changeQty = (currentItems, itemToChange, type) => {
    const targetItem = currentItems.find(
        // eslint-disable-next-line no-underscore-dangle
        (item) => item._id === itemToChange._id
    );

    let quantity = itemToChange.prdQty;

    if (type === 'inc') {
        quantity += 1;
    } else if (type === 'dec') {
        quantity -= 1;
    }

    if (targetItem) {
        return [...currentItems, { ...itemToChange, prdQty: quantity }];
    }
    console.log('bruh');
    return currentItems;
};

export const useCart = create((set) => ({
    items: [],
    addItem: (items) =>
        set((state) => ({
            items: addCartItem(state.items, items),
        })),
    changeQuantity: (itemToChange, type) =>
        set((state) => ({
            items: changeQty(state.items, itemToChange, type),
        })),
}));

// username: '',
//     isAdmin: false,
