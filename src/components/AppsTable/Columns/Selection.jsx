import { Checkbox } from 'components/AppsTable/Checkbox';

export const Selection = {
  id: 'selection',
  accessor: (row, index, meta) => !!meta.isSelected,
  sortType: (
    {isSelected}, {isSelected: nextIsSelected}
    // values, nextValues
  ) => (
    isSelected && !nextIsSelected ?
      -1 : 0
  ),
  Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
  Footer: ({ selectedFlatRows }) => {
    return `${selectedFlatRows.length} selected`;
  },
  Header: ({ getToggleAllRowsSelectedProps }) => (
    <Checkbox {...getToggleAllRowsSelectedProps()} />
  ),
  minWidth: 30,
};
