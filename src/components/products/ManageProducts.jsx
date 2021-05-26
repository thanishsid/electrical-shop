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
import { IconContext } from 'react-icons';
import AddProducts from './AddProducts';
import EditProducts from './EditProducts';
import RemoveProducts from './RemoveProducts';
import ProductTransaction from './ProductTransaction';

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

    const isActive = (index) =>
        value === index ? 'sub-tab-icon-active' : 'sub-tab-icon-inactive ';

    return (
        <div className="half">
            <IconContext.Provider value={{ size: '3rem' }}>
                <ul className="flex justify-around shadow-md border-b-2 pb-4">
                    <li className={isActive(0)}>
                        <Link to={`${url}`}>
                            <MdShoppingCart />
                        </Link>
                    </li>
                    <li className={isActive(1)}>
                        <Link to={`${url}/edit`}>
                            <MdEdit />
                        </Link>
                    </li>
                    <li className={isActive(2)}>
                        <Link to={`${url}/add`}>
                            <GoPlus />
                        </Link>
                    </li>
                    <li className={isActive(3)}>
                        <Link to={`${url}/remove`}>
                            <MdDelete />
                        </Link>
                    </li>
                </ul>
            </IconContext.Provider>
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
