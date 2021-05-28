import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
    Link,
    useLocation,
    useParams,
} from 'react-router-dom';
import { BiDetail } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import SubNav from '../common/SubNav';
import OrderDetails from './OrderDetails';
import RemoveOrders from './RemoveOrders';
import { isActive } from '../../functions/generalFunctions';

const OrderFunctions = () => {
    const { funcId } = useParams();

    switch (funcId) {
        case 'remove':
            return <RemoveOrders />;
        default:
            return null;
    }
};

export default function ManageOrders() {
    const [value, setValue] = React.useState(0);

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
            <SubNav>
                <li className={isActive(0, value)}>
                    <Link className="sub-tab-link" to={`${url}`}>
                        <BiDetail />
                    </Link>
                </li>
                <li className={isActive(1, value)}>
                    <Link className="sub-tab-link" to={`${url}/remove`}>
                        <MdDelete />
                    </Link>
                </li>
            </SubNav>

            <Switch>
                <Route path={path} exact>
                    <OrderDetails />
                </Route>
                <Route path={`${path}/:funcId`}>
                    <OrderFunctions />
                </Route>
            </Switch>
        </div>
    );
}
