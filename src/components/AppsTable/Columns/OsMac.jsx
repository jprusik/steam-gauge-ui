import { useMemo } from 'react';
import { appFields } from 'constants/appFields';
import { booleanCount } from 'utils/totals';
import { Boolean } from 'components/Boolean';

export const OsMac = {
  accessor: appFields.OS_MAC,
  Cell: ({
    row: {
      values: { [appFields.OS_MAC]: value },
    },
  }) => <Boolean value={value} />,
  Footer: ({ selectedFlatRows }) => {
    const total = useMemo(
      () => booleanCount(selectedFlatRows, appFields.OS_MAC),
      [selectedFlatRows]
    );

    return `${total} Mac game(s)`;
  },
  Header: 'Mac',
  minWidth: 36,
  type: 'boolean',
};
