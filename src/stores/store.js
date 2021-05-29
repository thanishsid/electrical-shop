/* eslint-disable no-underscore-dangle */
import create from 'zustand';
import { getData, dbFunction } from '../dbcontroller/renderer';
import {
    removeItems,
    removeItem,
    updateProduct,
    addCartItems,
    changeQty,
    editSalePrice,
    updatePrdQty,
    TransactionItem,
} from '../functions/storeFunctions';

export const useProducts = create((set) => ({
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
}));

export const useCustomers = create((set) => ({
    customers: [],
    setCustomers: async () => {
        const data = await getData('customers', {});
        set(() => ({ customers: data }));
    },
    insertCustomers: async (customer) => {
        const data = await dbFunction('insert', 'customers', customer);
        return data;
    },
    deleteCustomer: async (id) => {
        const data = await dbFunction('delete', 'customers', id);
        return data;
    },
    editCustomer: async (id, customerData) => {
        const data = await dbFunction('edit', 'customers', {
            id,
            newData: customerData,
        });
        return data;
    },
    selectedCustomers: [],
    setCustomerSelection: (data) => {
        set(() => ({
            selectedCustomers: data,
        }));
    },
}));

export const useCart = create((set) => ({
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
}));

export const useSales = create((set) => ({
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
}));

export const useOrders = create((set) => ({
    orders: [],
    setOrders: async () => {
        const data = await getData('orders', {});
        set(() => ({ orders: data }));
    },
    insertOrder: async (items, customer) => {
        const orderData = new TransactionItem('order', items, customer);
        const data = await dbFunction('insert', 'orders', orderData);
        set((state) => ({ orders: [...state.orders, data] }));
    },
    selectedOrders: [],
    setOrdersSelection: (data) => {
        set(() => ({ selectedOrders: data }));
    },
    deleteOrder: async (id) => {
        const data = await dbFunction('delete', 'orders', id);
        set((state) => removeItem('orders', state.orders, id, data));
    },
}));
