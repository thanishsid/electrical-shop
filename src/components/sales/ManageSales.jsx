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
import { MdAssignmentReturn, MdDelete } from 'react-icons/md';
import { IconContext } from 'react-icons';
import SaleDetails from './SaleDetails';
import ReturnSale from './ReturnSale';
import RemoveSales from './RemoveSales';

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

export default function ManageSales() {
    const [value, setValue] = React.useState(0);

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

    const isActive = (index) =>
        value === index ? 'sub-tab-icon-active' : 'sub-tab-icon-inactive';

    return (
        <div className="half">
            <IconContext.Provider value={{ size: '3rem' }}>
                <ul className="flex justify-around shadow-md border-b-2 pb-4">
                    <li className={isActive(0)}>
                        <Link to={`${url}`}>
                            <BiDetail />
                        </Link>
                    </li>
                    <li className={isActive(1)}>
                        <Link to={`${url}/return`}>
                            <MdAssignmentReturn />
                        </Link>
                    </li>
                    <li className={isActive(2)}>
                        <Link to={`${url}/remove`}>
                            <MdDelete />
                        </Link>
                    </li>
                </ul>
            </IconContext.Provider>
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
