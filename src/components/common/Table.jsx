/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import Selector from './Selector';
import './Table.css';

export default function Table({ rowData, columnData, type }) {
    const allRows = rowData;

    const columns = useMemo(() => columnData, [columnData]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: allRows || [] }, useSortBy);

    return (
        <table {...getTableProps()} className="table">
            <thead className="tableHeader">
                {headerGroups.map((headerGroup) => (
                    <tr
                        {...headerGroup.getHeaderGroupProps()}
                        className="tableRow"
                    >
                        <th className="tableHead widen"> </th>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                )}
                                className="tableHead"
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
                        <tr className="tableRow" {...row.getRowProps()}>
                            <Selector row={row.original} type={type} />
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
