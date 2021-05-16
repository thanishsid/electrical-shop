/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import Selector from './Selector';

const TableContainer = styled.section`
    display: flex;
    flex-direction: column;
`;

const Table = styled.table`
    width: 100%;
`;

// const FilterInput = styled(TextField)`
//     width: 100%;
// `;

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
    user-select: none;
`;

const TableCell = styled.td`
    word-wrap: break-word;
    padding: 0.3rem;
    border: solid 1px gray;
    background: rgb(255, 255, 255);
    text-align: center;
    width: ${(props) => (props.shrink ? '3rem' : '')};
`;

const GlobalFilterContainer = styled.section`
    display: flex;
`;

const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <GlobalFilterContainer>
            <TextField
                variant="outlined"
                placeholder="Enter Search Query"
                value={filter || ''}
                onChange={(event) => setFilter(event.target.value)}
                fullWidth
            />
        </GlobalFilterContainer>
    );
};

export default function DataTable({ rowData, columnData, type }) {
    const allRows = rowData;

    const columns = useMemo(() => columnData, [columnData]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({ columns, data: allRows || [] }, useGlobalFilter, useSortBy);

    const { globalFilter } = state;

    return (
        <TableContainer>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <Table {...getTableProps()}>
                <TableHeader>
                    {headerGroups.map((headerGroup) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            <Th shrink> </Th>
                            {headerGroup.headers.map((column) => (
                                <Th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted &&
                                            (column.isSortedDesc
                                                ? ' 🔻'
                                                : ' 🔺')}
                                    </span>
                                </Th>
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
        </TableContainer>
    );
}
