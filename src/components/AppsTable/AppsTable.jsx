import { Fragment } from 'react';
import styled from '@emotion/styled';
import {
  useExpanded,
  useFilters,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { AppsTableFilter } from './AppsTableFilter';
import { DataExport } from './DataExport';
import { AppsTableHeaderRow } from './AppsTableHeaderRow';
import { AppsTableRow } from './AppsTableRow';
import { AppsTableFooter } from './AppsTableFooter';
import { AppsTablePagination } from './AppsTablePagination';

export function AppsTable({ columns, data }) {
  const {
    canNextPage,
    canPreviousPage,
    footerGroups,
    getTableBodyProps,
    getTableProps,
    headerGroups,
    nextPage,
    page,
    pageOptions,
    preGlobalFilteredRows,
    prepareRow,
    previousPage,
    setGlobalFilter,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        // Workaround to select all rows initially
        selectedRowIds: data.reduce((allRows, app, index) => ({ ...allRows, [index]: true }), {})
      }
    },
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
  );

  const maxPageSize = Math.min(data ? data.length : 50, 50);

  return (
    <Fragment>
      <TableToolbar>
        <AppsTableFilter
          globalFilter={globalFilter}
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
        />
        <DataExport data={data} />
      </TableToolbar>
      <TableContainer>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => {
              const { key, ...otherHeaderGroupProps } = headerGroup.getHeaderGroupProps();

              return (
                <AppsTableHeaderRow key={key} headerGroupProps={otherHeaderGroupProps} {...headerGroup} />
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              const { key, ...otherRowProps } = row.getRowProps();

              return (
                <AppsTableRow key={key} rowProps={otherRowProps} {...row} />
              );
            })}
          </tbody>
          <AppsTableFooter footerGroups={footerGroups} />
        </table>
      </TableContainer>
      <AppsTablePagination {...{
        canNextPage,
        canPreviousPage,
        maxPageSize,
        nextPage,
        pageIndex,
        pageOptions,
        pageSize,
        previousPage,
        setPageSize,
      }} />
    </Fragment>
  );
}

const scrollbarThumbColor = '#333333';
const scrollbarBackgroundColor = '#555555';

const TableContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  text-shadow: #3d3d3d 1px 1px 1px;
  scrollbar-color: ${scrollbarThumbColor} ${scrollbarBackgroundColor};
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    height: 18px;
  }

  ::-webkit-scrollbar-track {
    background: ${scrollbarBackgroundColor};
  }

  ::-webkit-scrollbar-thumb {
    border: 3px solid ${scrollbarBackgroundColor};
    border-radius: 9px;
    background-color: ${scrollbarThumbColor};
  }
`;

const TableToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
