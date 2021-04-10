import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ProductFunctions from './ProductFunctions';
import ProductTransaction from './ProductTransaction';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: '100%',
        margin: '0, auto',
    },
});

export default function IconLabelTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { path, url } = useRouteMatch();

    return (
        <div className="rightHalf">
            <Paper square className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="icon label tabs example"
                >
                    <Tab
                        icon={<AddShoppingCartIcon />}
                        label="TRANSACTION"
                        component={Link}
                        to={`${url}`}
                    />
                    <Tab
                        icon={<EditIcon />}
                        label="EDIT"
                        component={Link}
                        to={`${url}/edit`}
                    />
                    <Tab
                        icon={<AddIcon />}
                        label="ADD"
                        component={Link}
                        to={`${url}/add`}
                    />
                    <Tab
                        icon={<DeleteForeverIcon />}
                        label="DELETE"
                        component={Link}
                        to={`${url}/remove`}
                    />
                </Tabs>
            </Paper>
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
