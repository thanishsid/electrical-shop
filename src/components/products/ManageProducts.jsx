import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import ProductFunctions from './ProductFunctions';

const ManageProducts = () => {
    const { path, url } = useRouteMatch();

    return (
        <div style={{ height: '90vh', width: '50%' }}>
            <ul>
                <li>
                    <Link to={`${url}/transaction`}>Transaction</Link>
                </li>
                <li>
                    <Link to={`${url}/add`}>Add Product</Link>
                </li>
                <li>
                    <Link to={`${url}/edit`}>Edit Product</Link>
                </li>
                <li>
                    <Link to={`${url}/remove`}>Remove Products</Link>
                </li>
            </ul>

            <Switch>
                <Route path={path} exact>
                    <h3>Please select an Option</h3>
                </Route>
                <Route path={`${path}/:funcId`}>
                    <ProductFunctions />
                </Route>
            </Switch>
        </div>
    );
};

export default ManageProducts;
