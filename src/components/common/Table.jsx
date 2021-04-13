/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import Selector from './Selector';
import './Table.css';

export default function ProductsTable({ rowData, columnData }) {
    const products = rowData;

    const columns = useMemo(() => columnData, [columnData]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: products || [] }, useSortBy);

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        <th className="widen"> </th>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                )}
                            >
                                {column.render('Header')}
                                <span>
                                    {column.isSorted &&
                                        (column.isSortedDesc ? ' 🔻' : ' 🔺')}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody {...getTableBodyProps()} className="tableBody">
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            <Selector row={row.original} />
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        className="tableCell"
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
