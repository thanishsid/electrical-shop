import create from 'zustand';
import { getData, dbFunction } from './dbcontroller/renderer';

const removeSelection = (currentSelections, rowToRemove) => {
    const newSelections = currentSelections.filter(
        // eslint-disable-next-line no-underscore-dangle
        (rows) => rows._id !== rowToRemove._id
    );
    return newSelections;
};

const useStore = create((set) => ({
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
        const data = await dbFunction('edit', 'products', { id, productData });
        console.log(data);
    },
    deleteProduct: async (id) => {
        const data = await dbFunction('delete', 'products', id);
        console.log(data);
    },
    selectedProducts: [],
    setSelection: ({ isSelected, data }) => {
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
    customers: [],
    setCustomers: async () => {
        const data = await getData('customers');
        set(() => ({ customers: data }));
        console.log(data);
    },
    insertCustomers: async (customer) => {
        const data = await dbFunction('insert', 'customers', customer);
        console.log(data);
    },
    deleteCustomers: async (id) => {
        const data = await dbFunction('delete', 'customers', id);
        console.log(data);
    },
    editCustomers: async (id, customerData) => {
        const data = await dbFunction('edit', 'customers', {
            id,
            customerData,
        });
        console.log(data);
    },
    username: '',
    isAdmin: false,
}));

export default useStore;
