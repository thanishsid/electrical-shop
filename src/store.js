import create from 'zustand';
import { allAsync, runAsync } from './dbcontroller/renderer';

const commands = {
    getProducts:
        'SELECT product_id as id, product_name, qty, cost, wholesalePrice, retailPrice FROM products',
    insertProduct: (name, qty, cost, wprice, rprice) =>
        `INSERT INTO products VALUES(null, '${name}', ${qty}, ${cost}, ${wprice}, ${rprice})`,
    editProduct: (id, productData) => `UPDATE products
    SET product_name = '${productData.name}',
        qty = ${productData.qty},
        cost = ${productData.cost},
        wholesalePrice = ${productData.wprice},
        retailPrice = ${productData.rprice}
    WHERE
        prouct_id = ${id};`,
    deleteProduct: (id) => `DELETE FROM products WHERE product_id = ${id}`,
};

const removeSelection = (currentSelections, rowToRemove) => {
    const newSelections = currentSelections.filter(
        (rows) => rows.id !== rowToRemove.id
    );
    return newSelections;
};

const useStore = create((set) => ({
    products: [],
    setProducts: async () => {
        const data = await allAsync(commands.getProducts);
        set(() => ({ products: data }));
        // console.log(data);
    },
    insertProducts: async (...args) => {
        const data = await runAsync(
            commands.insertProduct(args[0], args[1], args[2], args[3], args[4])
        );
        console.log(data);
    },
    editProduct: async (id, productData) => {
        const data = await runAsync(commands.editProduct(id, productData));
        console.log(data);
    },
    deleteProduct: async (id) => {
        const data = await runAsync(commands.deleteProduct(id));
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
