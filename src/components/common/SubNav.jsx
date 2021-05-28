import React from 'react';
import { IconContext } from 'react-icons';

const SubNav = ({ children }) => {
    return (
        <IconContext.Provider value={{ size: '3rem' }}>
            <ul className="flex shadow-md border-b-2 rounded-md h-20">
                {children}
            </ul>
        </IconContext.Provider>
    );
};

export default SubNav;
