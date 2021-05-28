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
import SubNav from '../common/SubNav';
import SaleDetails from './SaleDetails';
import ReturnSale from './ReturnSale';
import RemoveSales from './RemoveSales';
import { isActive } from '../../functions/generalFunctions';

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

    return (
        <div className="half">
            <SubNav>
                <li className={isActive(0, value)}>
                    <Link className="sub-tab-link" to={`${url}`}>
                        <BiDetail />
                    </Link>
                </li>
                <li className={isActive(1, value)}>
                    <Link className="sub-tab-link" to={`${url}/return`}>
                        <MdAssignmentReturn />
                    </Link>
                </li>
                <li className={isActive(2, value)}>
                    <Link className="sub-tab-link" to={`${url}/remove`}>
                        <MdDelete />
                    </Link>
                </li>
            </SubNav>

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
