import { getData, dbFunction } from '../dbcontroller/renderer';
import { removeItem, TransactionItem } from '../functions/storeFunctions';

const saleStore = (set) => ({
    sales: [],
    setSales: async () => {
        const data = await getData('sales', {});
        set(() => ({ sales: data }));
    },
    insertSale: async (items, customer) => {
        const saleData = new TransactionItem('sale', items, customer);
        const data = await dbFunction('sale', null, saleData);
        if (data.name !== 'Error' && data.newSale) {
            set((state) => ({ sales: [...state.sales, data.newSale] }));
        }
        return data;
    },
    selectedSales: [],
    setSalesSelection: (data) => {
        set(() => ({
            selectedSales: data,
        }));
    },
    deleteSale: async (id) => {
        const data = await dbFunction('delete', 'sales', id);
        set((state) => removeItem('sales', state.sales, id, data));
    },
});

export default saleStore;
