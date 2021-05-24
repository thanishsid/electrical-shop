/* eslint-disable react/display-name */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-key */
import React, { useMemo, useEffect } from 'react';
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    useRowSelect,
    usePagination,
} from 'react-table';
import CheckBox from './Checkbox';

const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <input
            className="w-full h-12 mb-4 border-2 rounded-lg p-2 focus:outline-none focus:shadow-inner"
            placeholder="Search"
            value={filter || ''}
            onChange={(event) => setFilter(event.target.value)}
        />
    );
};

export default function DataTable({ rowData, columnData, setSelectedRows }) {
    const allRows = rowData;

    const columns = useMemo(() => columnData, [columnData]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        state,
        setGlobalFilter,
        selectedFlatRows,
    } = useTable(
        { columns, data: allRows || [] },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((cols) => {
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <CheckBox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <CheckBox {...row.getToggleRowSelectedProps()} />
                        ),
                    },
                    ...cols,
                ];
            });
        }
    );

    useEffect(() => {
        const selectedRows = selectedFlatRows.map((row) => row.original);
        setSelectedRows(selectedRows);
    }, [selectedFlatRows, setSelectedRows]);

    const { globalFilter } = state;

    return (
        <div className="flex flex-col h-full">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table className="table-auto" {...getTableProps()}>
                <thead className="bg-blue-100 border text-base">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    className="select-none h-8"
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
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody
                    className="overflow-y-auto font-semibold"
                    {...getTableBodyProps()}
                >
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            className="border p-2 border-gray-300 text-center"
                                            {...cell.getCellProps()}
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
            <div className="flex justify-center mt-auto border-t-2 pt-4">
                <button
                    className={`${
                        canPreviousPage ? 'btn' : 'btn-disabled bg-gray-200'
                    } mx-2`}
                    type="button"
                    onClick={previousPage}
                    disabled={!canPreviousPage}
                >
                    Previous Page
                </button>
                <button
                    className={`${
                        canNextPage ? 'btn' : 'btn-disabled bg-gray-200'
                    } mx-2`}
                    type="button"
                    onClick={nextPage}
                    disabled={!canNextPage}
                >
                    Next Page
                </button>
            </div>
        </div>
    );
}
