import { getData, dbFunction } from '../dbcontroller/renderer';
import { removeItem, TransactionItem } from '../functions/storeFunctions';

const orderStore = (set) => ({
    orders: [],
    setOrders: async () => {
        const data = await getData('orders', {});
        set(() => ({ orders: data }));
    },
    insertOrder: async (items, customer) => {
        const orderData = new TransactionItem('order', items, customer);
        const data = await dbFunction('insert', 'orders', orderData);
        set((state) => ({ orders: [...state.orders, data] }));
        return data;
    },
    selectedOrders: [],
    setOrdersSelection: (data) => {
        set(() => ({ selectedOrders: data }));
    },
    deleteOrder: async (id) => {
        const data = await dbFunction('delete', 'orders', id);
        set((state) => removeItem('orders', state.orders, id, data));
    },
});

export default orderStore;
