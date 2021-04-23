import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import NavTabs from './components/common/NavTabs';
import ProductScreen from './screens/ProductScreen';
import SalesScreen from './screens/SalesScreen';
import OrdersScreen from './screens/OrdersScreen';
import CustomersScreen from './screens/CustomersScreen';
import SettingsScreen from './screens/SettingsScreen';
import { useProducts, useCustomers, useSales } from './store';
import './App.css';

function App() {
    const setProducts = useProducts((state) => state.setProducts);
    const setCustomers = useCustomers((state) => state.setCustomers);
    const setSales = useSales((state) => state.setSales);

    React.useEffect(() => {
        const setData = async () => {
            await setProducts();
            await setCustomers();
            await setSales();
        };

        setData();
    }, [setProducts, setCustomers, setSales]);

    return (
        <Router>
            <>
                <NavTabs />
            </>
            <Switch>
                <Route path="/products">
                    <ProductScreen />
                </Route>
                <Route path="/sales">
                    <SalesScreen />
                </Route>
                <Route path="/orders">
                    <OrdersScreen />
                </Route>
                <Route path="/customers">
                    <CustomersScreen />
                </Route>
                <Route path="/settings">
                    <SettingsScreen />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
