import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavTabs() {
    const [value, setValue] = React.useState(0);

    const { pathname } = useLocation();

    React.useEffect(() => {
        if (pathname.includes('products')) {
            setValue(0);
        } else if (pathname.includes('sales')) {
            setValue(1);
        } else if (pathname.includes('orders')) {
            setValue(2);
        } else if (pathname.includes('customers')) {
            setValue(3);
        } else if (pathname.includes('returns')) {
            setValue(4);
        } else if (pathname.includes('settings')) {
            setValue(5);
        }
    }, [pathname]);

    const isActive = (index) => {
        if (value === index) {
            return 'active-main-tab-link';
        }
        return 'inactive-main-tab-link';
    };

    return (
        <div className="nav-tab">
            <ul className="flex gap-4">
                <li className="flex-1">
                    <Link to="/products">
                        <p className={isActive(0)}>Products</p>
                    </Link>
                </li>
                <li className="flex-1">
                    <Link to="/sales">
                        <p className={isActive(1)}>Sales</p>
                    </Link>
                </li>
                <li className="flex-1">
                    <Link to="/orders">
                        <p className={isActive(2)}> Orders</p>
                    </Link>
                </li>
                <li className="flex-1">
                    <Link to="/customers">
                        <p className={isActive(3)}> Customers</p>
                    </Link>
                </li>
                <li className="flex-1">
                    <Link to="/returns">
                        <p className={isActive(4)}> Returns</p>
                    </Link>
                </li>
                <li className="flex-1">
                    <Link to="/settings">
                        <p className={isActive(5)}> Settings</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
