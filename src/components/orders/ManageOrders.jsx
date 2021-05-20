import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
    Link,
    useLocation,
    useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DetailsIcon from '@material-ui/icons/Details';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import OrderDetails from './OrderDetails';
import RemoveOrders from './RemoveOrders';

const FunctionPanel = styled(Paper)`
    max-width: 100%;
    margin: 0, auto;
    border-radius: 0.5em;
`;

const SaleFunctions = () => {
    const { funcId } = useParams();

    switch (funcId) {
        case 'remove':
            return <RemoveOrders />;
        default:
            return null;
    }
};

export default function IconLabelTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (_event, newValue) => {
        setValue(newValue);
    };

    const { path, url } = useRouteMatch();

    const { pathname } = useLocation();

    React.useEffect(() => {
        if (pathname === '/orders') {
            setValue(0);
        } else if (pathname === '/orders/remove') {
            setValue(1);
        }
    }, [pathname]);

    return (
        <div className="half">
            <FunctionPanel>
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
                        icon={<DetailsIcon />}
                        label="Details"
                        component={Link}
                        to={`${url}`}
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
                    <OrderDetails />
                </Route>
                <Route path={`${path}/:funcId`}>
                    <SaleFunctions />
                </Route>
            </Switch>
        </div>
    );
}
