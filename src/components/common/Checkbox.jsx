/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useRef } from 'react';

const CheckBox = forwardRef(({ indeterminate, logName, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <input
            className="transform scale-110"
            onChange={logName}
            type="checkbox"
            ref={resolvedRef}
            {...rest}
        />
    );
});

export default CheckBox;
