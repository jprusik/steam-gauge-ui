import { useMemo } from 'react';
import { appFields } from 'constants/appFields';
import { booleanCount } from 'utils/totals';
import { Boolean } from 'components/Boolean';

export const HdrEnabled = {
  accessor: appFields.HDR,
  Cell: ({
    row: {
      values: { [appFields.HDR]: value },
    },
  }) => <Boolean value={value} />,
  Footer: ({ selectedFlatRows }) => {
    const total = useMemo(
      () => booleanCount(selectedFlatRows, appFields.HDR),
      [selectedFlatRows]
    );

    return `${total} HDR-enabled game(s)`;
  },
  Header: 'HDR',
  minWidth: 38,
};
