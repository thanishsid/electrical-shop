import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
    Link,
    useLocation,
    useParams,
} from 'react-router-dom';
import { MdShoppingCart, MdEdit, MdDelete } from 'react-icons/md';
import { GoPlus } from 'react-icons/go';
import SubNav from '../common/SubNav';
import AddProducts from './AddProducts';
import EditProducts from './EditProducts';
import RemoveProducts from './RemoveProducts';
import ProductTransaction from './ProductTransaction';
import { isActive } from '../../functions/generalFunctions';

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

export default function ManageProducts() {
    const [value, setValue] = React.useState(0);

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
            <SubNav>
                <li className={isActive(0, value)}>
                    <Link className="sub-tab-link" to={`${url}`}>
                        <MdShoppingCart />
                    </Link>
                </li>
                <li className={isActive(1, value)}>
                    <Link className="sub-tab-link" to={`${url}/edit`}>
                        <MdEdit />
                    </Link>
                </li>
                <li className={isActive(2, value)}>
                    <Link className="sub-tab-link" to={`${url}/add`}>
                        <GoPlus />
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
                    <ProductTransaction />
                </Route>
                <Route path={`${path}/:funcId`}>
                    <ProductFunctions />
                </Route>
            </Switch>
        </div>
    );
}
