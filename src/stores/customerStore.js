import { getData, dbFunction } from '../dbcontroller/renderer';

const customerStore = (set) => ({
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
});

export default customerStore;
