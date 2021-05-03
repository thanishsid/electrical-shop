/* eslint-disable no-underscore-dangle */
import create from 'zustand';
import { getData, dbFunction } from './dbcontroller/renderer';
import {
    removeItems,
    addCartItem,
    changeQty,
    editSalePrice,
} from './functions/storeFunctions';

export const useProducts = create((set) => ({
    products: [],
    setProducts: async () => {
        const data = await getData('products', {});
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
                selectedProducts: removeItems(state.selectedProducts, data),
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
        const data = await getData('customers', {});
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
                selectedCustomers: removeItems(state.selectedCustomers, data),
            }));
        }
    },
    clearSelectedCustomers: () => {
        set(() => ({ selectedCustomers: [] }));
    },
}));

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
    changeSalePrice: (itemToChange, amount) =>
        set((state) => ({
            items: editSalePrice(state.items, itemToChange, amount),
        })),
    removeItem: (item) =>
        set((state) => ({
            items: removeItems(state.items, item),
        })),
}));

export const useSales = create((set) => ({
    sales: [],
    setSales: async () => {
        const data = await getData('sales', {});
        set(() => ({ sales: data }));
    },
    insertSale: async (items, customer) => {
        const saleCustomer = customer
            ? { customerId: customer._id, customerName: customer.custName }
            : null;

        const saleData = {
            items,
            customer: saleCustomer,
            time: new Date().toISOString(),
        };
        const data = await dbFunction('sale', null, saleData);
        console.log(data);
    },
    selectedSales: [],
    setSalesSelection: ({ isSelected, data }) => {
        if (isSelected) {
            set((state) => ({
                selectedSales: [...state.selectedSales, data],
            }));
        } else {
            set((state) => ({
                selectedSales: removeItems(state.selectedSales, data),
            }));
        }
    },
    clearSelectedSales: () => {
        set(() => ({ selectedSales: [] }));
    },
}));
