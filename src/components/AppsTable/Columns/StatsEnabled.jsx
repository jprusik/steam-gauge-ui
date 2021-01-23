import { useMemo } from 'react';
import { appFields } from 'constants/appFields';
import { booleanCount } from 'utils/totals';
import { Boolean } from 'components/Boolean';

export const StatsEnabled = {
  accessor: appFields.STATS_ENABLED,
  Cell: ({
    row: {
      values: { [appFields.STATS_ENABLED]: value },
    },
  }) => <Boolean value={value} />,
  Footer: ({ selectedFlatRows }) => {
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
