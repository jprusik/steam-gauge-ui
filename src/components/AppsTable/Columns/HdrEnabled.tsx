import { useMemo } from 'react';
import { Row } from 'react-table';
import { appFields } from 'constants/appFields';
import { booleanCount } from 'utils/totals';
import { Boolean } from 'components/Boolean';

export const HdrEnabled = {
  accessor: appFields.HDR,
  Cell: ({row}: {row: Row}) => (
    <Boolean value={row.values[appFields.HDR]} />
  ),
  Footer: ({selectedFlatRows}: {selectedFlatRows: Row[]}) => {
    const total = useMemo(
      () => booleanCount(selectedFlatRows, appFields.HDR),
      [selectedFlatRows]
    );

    return `${total} HDR-enabled game(s)`;
  },
  Header: 'HDR',
  minWidth: 38,
};
