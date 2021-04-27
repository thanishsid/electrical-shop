import React from 'react';
import { useParams } from 'react-router-dom';
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

export default SaleFunctions;
