/* eslint-disable no-underscore-dangle */
import create from 'zustand';
import { getData, dbFunction } from '../dbcontroller/renderer';
import {
    removeItems,
    removeItem,
    updateProduct,
    refreshMultipleQty,
    addCartItem,
    changeQty,
    editSalePrice,
    updatePrdQty,
} from '../functions/storeFunctions';

export const useProducts = create((set) => ({
    products: [],
    setProducts: async () => {
        const data = await getData('products', {});
        set(() => ({ products: data }));
    },
    insertProducts: async (product) => {
        const data = await dbFunction('insert', 'products', product);
        set((state) => ({ products: [...state.products, data] }));
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
    refreshProductSelection: (data, isMany) => {
        if (isMany) {
            set((state) => refreshMultipleQty(state.selectedProducts, data));
        } else {
            set(() => ({
                selectedProducts: [data],
            }));
        }
    },
    updateProductQty: (newData) => {
        set((state) => updatePrdQty(state, newData));
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
    refreshCustomerSelection: (data) => {
        set(() => ({
            selectedCustomers: [data],
        }));
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
    clearCart: () => set(() => ({ items: [] })),
}));

export const useSales = create((set) => ({
    sales: [],
    setSales: async () => {
        const data = await getData('sales', {});
        set(() => ({ sales: data }));
    },
    insertSale: async (items, customer) => {
        const compactItems = items.map((item) => {
            const compactItem = { ...item };
            delete compactItem.origQty;
            return compactItem;
        });

        console.log(compactItems);
        const saleCustomer = customer
            ? { customerId: customer._id, customerName: customer.custName }
            : null;

        const saleData = {
            items: compactItems,
            customer: saleCustomer,
            time: new Date().toISOString(),
        };
        const data = await dbFunction('sale', null, saleData);
        const { newSale } = data;
        set((state) => ({ sales: [...state.sales, newSale] }));
        return data;
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
    deleteSale: async (id) => {
        const data = await dbFunction('delete', 'sales', id);
        set((state) => removeItem('sales', state.sales, id, data));
    },
    clearSelectedSales: () => {
        set(() => ({ selectedSales: [] }));
    },
}));
