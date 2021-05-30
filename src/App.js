import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import NavTabs from './components/common/NavTabs';
import ProductScreen from './screens/ProductScreen';
import SalesScreen from './screens/SalesScreen';
import OrdersScreen from './screens/OrdersScreen';
import CustomersScreen from './screens/CustomersScreen';
import ReturnsScreen from './screens/ReturnsScreen';
import SettingsScreen from './screens/SettingsScreen';
import useStore from './stores/store';

function App() {
    const setProducts = useStore((state) => state.setProducts);
    const setCustomers = useStore((state) => state.setCustomers);
    const setSales = useStore((state) => state.setSales);
    const setOrders = useStore((state) => state.setOrders);

    React.useEffect(() => {
        const setData = async () => {
            await setProducts();
            await setCustomers();
            await setSales();
            await setOrders();
        };

        setData();
    }, [setProducts, setCustomers, setSales, setOrders]);

    return (
        <div className="app-container">
            <Router>
                <div className="app">
                    <NavTabs />
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
                        <Route path="/returns">
                            <ReturnsScreen />
                        </Route>
                        <Route path="/settings">
                            <SettingsScreen />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
