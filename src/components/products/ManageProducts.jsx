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
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddProducts from './AddProducts';
import EditProducts from './EditProducts';
import RemoveProducts from './RemoveProducts';
import ProductTransaction from './ProductTransaction';

const FunctionPanel = styled(Paper)`
    max-width: 100%;
    margin: 0, auto;
    border-radius: 0.5em;
`;

const ProductFunctions = () => {
    const { funcId } = useParams();

    switch (funcId) {
        case 'add':
            return <AddProducts />;
        case 'edit':
            return <EditProducts />;
        case 'remove':
            return <RemoveProducts />;
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
        if (pathname === '/products') {
            setValue(0);
        } else if (pathname === '/products/edit') {
            setValue(1);
        } else if (pathname === '/products/add') {
            setValue(2);
        } else if (pathname === '/products/remove') {
            setValue(3);
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
                        icon={<AddShoppingCartIcon />}
                        label="TRANSACTION"
                        component={Link}
                        to={`${url}`}
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
                        icon={<AddIcon />}
                        label="ADD"
                        component={Link}
                        to={`${url}/add`}
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
                    <ProductTransaction />
                </Route>
                <Route path={`${path}/:funcId`}>
                    <ProductFunctions />
                </Route>
            </Switch>
        </div>
    );
}
