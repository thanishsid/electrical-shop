import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: '0',
        },
    },
    input: {
        borderRadius: 4,
        // position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        padding: '10px 12px 10px 12px',
        textAlign: 'center',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

export default function PriceSelects({ item, custPriceChange }) {
    // const classes = useStyles();
    const [saleType, setsaleType] = React.useState('retail');
    const handleSelectChange = (event) => {
        setsaleType(event.target.value);
    };

    React.useEffect(() => {
        if (saleType === 'retail') {
            custPriceChange(item, item.prdRePrice);
        } else if (saleType === 'wholesale') {
            custPriceChange(item, item.prdWhPrice);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saleType]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <FormControl>
                <Select
                    id="price-select"
                    value={saleType}
                    onChange={handleSelectChange}
                    input={<BootstrapInput />}
                >
                    <MenuItem value="retail">Retail</MenuItem>
                    <MenuItem value="wholesale">Wholesale</MenuItem>
                    <MenuItem value="custom">Custom</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="price-textbox">Price</InputLabel>
                <BootstrapInput
                    type="number"
                    disabled={saleType !== 'custom'}
                    placeholder="Set Price"
                    id="price-textbox"
                    onChange={(event) =>
                        custPriceChange(item, parseFloat(event.target.value))
                    }
                />
            </FormControl>
        </div>
    );
}
