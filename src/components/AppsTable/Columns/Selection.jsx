import styled from '@emotion/styled';
import { Checkbox } from 'components/AppsTable/Checkbox';

export const Selection = {
  id: 'selection',
  accessor: (row, index, meta) => !!meta.isSelected,
  Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
  Footer: ({ selectedFlatRows }) => (
    <SelectionFooterCellValue>
      {selectedFlatRows.length} selected
    </SelectionFooterCellValue>
  ),
  footerSpan: 4,
  Header: ({ getToggleAllRowsSelectedProps }) => (
    <Checkbox {...getToggleAllRowsSelectedProps()} />
  ),
  minWidth: 30,
  hasInteractiveChildren: true,
  sortType: (
    {isSelected}, {isSelected: nextIsSelected}
    // values, nextValues
  ) => (
    isSelected && !nextIsSelected ?
      -1 : 0
  ),
};

const SelectionFooterCellValue = styled.div`
  font-size: 16px;
`;
