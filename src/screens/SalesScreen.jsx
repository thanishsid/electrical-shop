import React from 'react';
import SalesTable from '../components/sales/SalesTable';
import ManageSales from '../components/sales/ManageSales';

const SalesScreen = () => {
    return (
        <div className="screens">
            <SalesTable />
            <ManageSales />
        </div>
    );
};

export default SalesScreen;
