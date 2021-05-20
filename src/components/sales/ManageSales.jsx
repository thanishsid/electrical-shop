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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SaleDetails from './SaleDetails';
import ReturnSale from './ReturnSale';
import RemoveSales from './RemoveSales';

const FunctionPanel = styled(Paper)`
    max-width: 100%;
    margin: 0, auto;
    border-radius: 0.5em;
`;

const SaleFunctions = () => {
    const { funcId } = useParams();

    switch (funcId) {
        case 'return':
            return <ReturnSale />;
        case 'remove':
            return <RemoveSales />;
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
        if (pathname === '/sales') {
            setValue(0);
        } else if (pathname === '/sales/return') {
            setValue(1);
        } else if (pathname === '/sales/remove') {
            setValue(2);
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
                        icon={<ArrowBackIcon />}
                        label="Return"
                        component={Link}
                        to={`${url}/return`}
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
                    <SaleDetails />
                </Route>
                <Route path={`${path}/:funcId`}>
                    <SaleFunctions />
                </Route>
            </Switch>
        </div>
    );
}
