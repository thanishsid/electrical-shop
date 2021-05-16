import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
    Link,
    useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CustomerFunctions from './CustomerFunctions';
import CustomerTransactions from './CustomerTransactions';

const FunctionPanel = styled(Paper)`
    max-width: 100%;
    margin: 0, auto;
    border-radius: 0.5em;
`;

export default function IconLabelTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (_event, newValue) => {
        setValue(newValue);
    };

    const { path, url } = useRouteMatch();

    const { pathname } = useLocation();

    React.useEffect(() => {
        if (pathname === '/customers') {
            setValue(0);
        } else if (pathname === '/customers/add') {
            setValue(1);
        } else if (pathname === '/customers/edit') {
            setValue(2);
        } else if (pathname === '/customers/remove') {
            setValue(3);
        }
    }, [pathname]);

    return (
        <div className="half">
            <FunctionPanel square>
                <Tabs
                    style={{ height: '10vh' }}
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="icon label tabs example"
                >
                    <Tab
                        disableRipple
                        icon={<AddShoppingCartIcon />}
                        label="SALES & ORDERS"
                        component={Link}
                        to={`${url}`}
                    />
                    <Tab
                        disableRipple
                        icon={<AddIcon />}
                        label="ADD"
                        component={Link}
                        to={`${url}/add`}
                    />
                    <Tab
                        disableRipple
                        icon={<EditIcon />}
                        label="EDIT"
                        component={Link}
                        to={`${url}/edit`}
                    />
                    <Tab
                        disableRipple
                        icon={<DeleteForeverIcon />}
                        label="DELETE"
                        component={Link}
                        to={`${url}/remove`}
                    />
                </Tabs>
            </FunctionPanel>
            <Switch>
                <Route path={path} exact>
                    <CustomerTransactions />
                </Route>
                <Route path={`${path}/:funcId`}>
                    <CustomerFunctions />
                </Route>
            </Switch>
        </div>
    );
}
