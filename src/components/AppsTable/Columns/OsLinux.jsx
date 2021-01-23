import { useMemo } from 'react';
import { appFields } from 'constants/appFields';
import { booleanCount } from 'utils/totals';
import { Boolean } from 'components/Boolean';

export const OsLinux = {
  accessor: appFields.OS_LINUX,
  Cell: ({
    row: {
      values: { [appFields.OS_LINUX]: value },
    },
  }) => <Boolean value={value} />,
  Footer: ({ selectedFlatRows }) => {
    const total = useMemo(
      () => booleanCount(selectedFlatRows, appFields.OS_LINUX),
      [selectedFlatRows]
    );

    return `${total} Linux game(s)`;
  },
  Header: 'Linux',
  minWidth: 44,
  type: 'boolean',
};
