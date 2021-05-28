import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
    Link,
    useLocation,
    useParams,
} from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import { FaHandshake } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import SubNav from '../common/SubNav';
import AddCustomers from './AddCustomers';
import EditCustomer from './EditCustomer';
import RemoveCustomers from './RemoveCustomers';
import CustomerTransactions from './CustomerTransactions';
import { isActive } from '../../functions/generalFunctions';

const CustomerFunctions = () => {
    const { funcId } = useParams();

    switch (funcId) {
        case 'add':
            return <AddCustomers />;
        case 'edit':
            return <EditCustomer />;
        case 'remove':
            return <RemoveCustomers />;
        default:
            return null;
    }
};

export default function ManageProducts() {
    const [value, setValue] = React.useState(0);

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
            <SubNav>
                <li className={isActive(0, value)}>
                    <Link className="sub-tab-link" to={`${url}`}>
                        <FaHandshake />
                    </Link>
                </li>
                <li className={isActive(1, value)} to="add">
                    <Link className="sub-tab-link" to={`${url}/add`}>
                        <GoPlus />
                    </Link>
                </li>
                <li className={isActive(2, value)}>
                    <Link className="sub-tab-link" to={`${url}/edit`}>
                        <MdEdit />
                    </Link>
                </li>
                <li className={isActive(3, value)}>
                    <Link className="sub-tab-link" to={`${url}/remove`}>
                        <MdDelete />
                    </Link>
                </li>
            </SubNav>
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
