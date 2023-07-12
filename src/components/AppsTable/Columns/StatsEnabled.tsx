import { useMemo } from 'react';
import { Row } from 'react-table';
import { appFields } from 'constants/appFields';
import { booleanCount } from 'utils/totals';
import { Boolean } from 'components/Boolean';

export const StatsEnabled = {
  accessor: appFields.STATS_ENABLED,
  Cell: ({row}: {row: Row}) => (
    <Boolean value={row.values[appFields.STATS_ENABLED]} />
  ),
  Footer: ({selectedFlatRows}: {selectedFlatRows: Row[]}) => {
    const total = useMemo(
      () => booleanCount(selectedFlatRows, appFields.STATS_ENABLED),
      [selectedFlatRows]
    );

    return `${total} stats-enabled game(s)`;
  },
  Header: 'Stats',
  minWidth: 40,
  type: 'boolean',
};
