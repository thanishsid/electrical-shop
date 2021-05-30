import { getData, dbFunction } from '../dbcontroller/renderer';
import {
    removeItem,
    updateProduct,
    updatePrdQty,
} from '../functions/storeFunctions';

const productStore = (set) => ({
    products: [],
    setProducts: async () => {
        const data = await getData('products', {});
        set(() => ({ products: data }));
    },
    insertProducts: async (product) => {
        const data = await dbFunction('insert', 'products', product);
        if (data.name === 'Error') {
            return data;
        }
        set((state) => ({ products: [...state.products, data] }));
        return data;
    },
    editProduct: async (id, productData) => {
        const data = await dbFunction('edit', 'products', {
            id,
            newData: productData,
        });
        set((state) => updateProduct(state.products, id, data));
    },
    deleteProduct: async (id) => {
        const data = await dbFunction('delete', 'products', id);
        set((state) => removeItem('products', state.products, id, data));
    },
    selectedProducts: [],
    setProductSelection: (data) => {
        set(() => ({
            selectedProducts: data,
        }));
    },
    updateProductQty: (newData) => {
        set((state) => updatePrdQty(state, newData));
    },
});

export default productStore;
