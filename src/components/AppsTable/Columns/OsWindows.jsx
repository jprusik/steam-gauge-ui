import { useMemo } from 'react';
import { appFields } from 'constants/appFields';
import { booleanCount } from 'utils/totals';
import { Boolean } from 'components/Boolean';

export const OsWindows = {
  accessor: appFields.OS_WINDOWS,
  Cell: ({
    row: {
      values: { [appFields.OS_WINDOWS]: value },
    },
  }) => <Boolean value={value} />,
  Footer: ({ selectedFlatRows }) => {
    const total = useMemo(
      () => booleanCount(selectedFlatRows, appFields.OS_WINDOWS),
      [selectedFlatRows]
    );

    return `${total} Windows game(s)`;
  },
  Header: 'Windows',
  minWidth: 56,
  type: 'boolean',
};
