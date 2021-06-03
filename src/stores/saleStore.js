import { getData, dbFunction } from '../dbcontroller/renderer';
import {
    removeItem,
    TransactionItem,
    updatePrdQty,
} from '../functions/storeFunctions';

const saleStore = (set) => ({
    sales: [],
    setSales: async () => {
        const data = await getData('sales', {});
        set(() => ({ sales: data }));
    },
    insertSale: async (items, customer) => {
        const saleData = new TransactionItem('sale', items, customer);
        const data = await dbFunction('sale', null, saleData);
        if (data.name !== 'Error' && data.newSale && data.updatedProducts) {
            set((state) => ({ sales: [...state.sales, data.newSale] }));
            set((state) => updatePrdQty(state.products, data.updatedProducts));
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
