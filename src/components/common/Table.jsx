/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import styled from 'styled-components';
import Selector from './Selector';

const Table = styled.table`
    /* border: 2px solid rgb(161, 155, 155);
    border-radius: 0.5em; */
    width: 100%;
`;

const TableHeader = styled.thead`
    width: 100%;
    border-bottom: solid 2px rgb(209, 27, 27);
    background: aliceblue;
    color: black;
    display: block;
`;

const TableBody = styled.tbody`
    display: block;
    height: 80vh;
    overflow-y: auto;
`;

const TableRow = styled.tr`
    display: table;
    width: 100%;
    table-layout: fixed;
`;

const Th = styled.th`
    width: ${(props) => (props.shrink ? '3rem' : '')};
`;

const TableCell = styled.td`
    word-wrap: break-word;
    padding: 0.3rem;
    border: solid 1px gray;
    background: rgb(255, 255, 255);
    text-align: center;
    width: ${(props) => (props.shrink ? '3rem' : '')};
`;

export default function DataTable({ rowData, columnData, type }) {
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
        <Table {...getTableProps()}>
            <TableHeader>
                {headerGroups.map((headerGroup) => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        <Th shrink> </Th>
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
                    </TableRow>
                ))}
            </TableHeader>

            <TableBody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <TableRow {...row.getRowProps()}>
                            <Selector
                                key={row.original._id}
                                row={row.original}
                                type={type}
                            />
                            {row.cells.map((cell) => {
                                return (
                                    <TableCell {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
