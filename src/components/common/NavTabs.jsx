import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function NavTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (_event, newValue) => {
        setValue(newValue);
    };

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

    return (
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab
                    disableRipple
                    label="Products"
                    component={Link}
                    to="/products"
                />
                <Tab disableRipple label="Sales" component={Link} to="/sales" />
                <Tab
                    disableRipple
                    label="Orders"
                    component={Link}
                    to="/orders"
                />
                <Tab
                    disableRipple
                    label="Customers"
                    component={Link}
                    to="/customers"
                />
                <Tab
                    disableRipple
                    label="Returns"
                    component={Link}
                    to="/returns"
                />
                <Tab
                    disableRipple
                    label="Settings"
                    component={Link}
                    to="/settings"
                />
            </Tabs>
        </Paper>
    );
}
