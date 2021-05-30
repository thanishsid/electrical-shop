import create from 'zustand';
import productStore from './productStore';
import customerStore from './customerStore';
import saleStore from './saleStore';
import orderStore from './orderStore';
import cartStore from './cartStore';

const useStore = create((set) => ({
    ...productStore(set),
    ...customerStore(set),
    ...saleStore(set),
    ...orderStore(set),
    ...cartStore(set),
}));

export default useStore;
