import create from 'zustand';
import { allAsync, runAsync } from './dbcontroller/renderer';

const commands = {
    getProducts: 'SELECT * FROM products',
    insert: (name, qty, cost, wprice, rprice) =>
        `INSERT INTO products VALUES(null, '${name}', ${qty}, ${cost}, ${wprice}, ${rprice})`,
    delete: (id) => `DELETE FROM products WHERE id = ${id}`,
};

const useStore = create((set) => ({
    products: [],
    setProducts: async () => {
        const data = await allAsync(commands.getProducts);
        set(() => ({ products: data }));
        console.log(data);
    },
    insertProducts: async (...args) => {
        const data = await runAsync(
            commands.insert(args[0], args[1], args[2], args[3], args[4])
        );
        console.log(data);
    },
    username: '',
    isAdmin: false,
}));

export default useStore;
