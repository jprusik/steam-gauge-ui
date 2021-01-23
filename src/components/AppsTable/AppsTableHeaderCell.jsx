import React from 'react';
import styled from '@emotion/styled';
import {SortIcon} from '../SortIcon';

export const AppsTableHeaderCell = ({
  canSort,
  children,
  headerProps,
  isSorted,
  isSortedDesc,
  minWidth,
}) => (
  <TableHeader isSorted={isSorted} {...headerProps}>
    <TableHeaderContent minWidth={minWidth}>
      {children}
      {canSort &&
        <SortIcon
          order={isSorted ? (isSortedDesc ? 'desc' : 'asc') : null}
        />
      }
    </TableHeaderContent>
  </TableHeader>
);

const TableHeader = styled.th`
  border-bottom: 1px solid #555555;
  background: ${({isSorted}) => isSorted ? '#3f3f3f' : '#74706f'};
  padding: 1em 0.5em;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.4);
  font-size: 1em;
`;

const TableHeaderContent = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  ${({minWidth}) => minWidth ?  `min-width: ${minWidth}px;` : ''}
`;
