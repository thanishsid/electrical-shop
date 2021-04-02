import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavTabs from './components/NavTabs';
import ProductScreen from './screens/ProductScreen';
import SalesScreen from './screens/SalesScreen';
import OrdersScreen from './screens/OrdersScreen';
import SettingsScreen from './screens/SettingsScreen';

function App() {
    return (
        <Router>
            <>
                <NavTabs />
            </>
            <Switch>
                <Route path="/" exact>
                    <ProductScreen />
                </Route>
                <Route path="/sales">
                    <SalesScreen />
                </Route>
                <Route path="/orders">
                    <OrdersScreen />
                </Route>
                <Route path="/settings">
                    <SettingsScreen />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
