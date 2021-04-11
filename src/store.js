import create from 'zustand';
import { getProducts, dbFunction } from './dbcontroller/renderer';

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
        const data = await getProducts();
        set(() => ({ products: data }));
    },
    insertProducts: async (product) => {
        const data = await dbFunction('insert-product', product);
        console.log(data);
    },
    editProduct: async (id, productData) => {
        console.log(id);
        console.log(productData);
        const data = await dbFunction('edit-product', { id, productData });
        console.log(data);
    },
    deleteProduct: async (id) => {
        const data = await dbFunction('delete-product', id);
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
    username: '',
    isAdmin: false,
}));

export default useStore;
