import { Checkbox } from 'components/AppsTable/Checkbox';

export const Selection = {
  id: 'selection',
  disableSortBy: true,
  // @TODO: add sorting for selection
  // accessor: (row, index, meta) => !!meta.isSelected,
  // sortType: ({values}, {values: nextValues}) => (
  //   values.selection && !nextValues.selection ?
  //     -1 : 0
  // ),
  Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
  Footer: ({ selectedFlatRows }) => {
    return `${selectedFlatRows.length} selected`;
  },
  Header: ({ getToggleAllRowsSelectedProps }) => (
    <Checkbox {...getToggleAllRowsSelectedProps()} />
  ),
  minWidth: 30,
};
