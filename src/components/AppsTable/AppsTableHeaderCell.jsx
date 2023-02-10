import styled from '@emotion/styled';
import {SortIcon} from '../SortIcon';

export const AppsTableHeaderCell = ({
  canSort,
  children,
  headerProps: {
    onClick,
    ...otherHeaderProps
  },
  isSorted,
  isSortedDesc,
  minWidth,
  hasInteractiveChildren = false,
}) => (
  <TableHeader
    isSorted={isSorted}
    // separate the click handler from the header in cases where the
    // header contains interactive elements (like a selection box)
    {...{...otherHeaderProps, onClick: hasInteractiveChildren ? () => {/* noop */} : onClick}}
  >
    <TableHeaderContent minWidth={minWidth}>
      {children}
      {canSort &&
        <div
          onClick={hasInteractiveChildren ? onClick : () => {/* noop */}}
        >
          <SortIcon
            order={isSorted ? (isSortedDesc ? 'desc' : 'asc') : null}
          />
        </div>
      }
    </TableHeaderContent>
  </TableHeader>
);

const headerRowHeight = 48;

const TableHeader = styled.th`
  border-bottom: 1px solid #555555;
  background: ${({isSorted}) => isSorted ? '#3f3f3f' : '#74706f'};
  padding: 0 0.5em;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.4);
  font-size: 1em;
`;

const TableHeaderContent = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  min-height: ${headerRowHeight}px;
  ${({minWidth}) => minWidth ?  `min-width: ${minWidth}px;` : ''}

  > * {
    display: flex;
    align-items: center;
    height: ${headerRowHeight}px;
  }
`;
