import { useMemo } from 'react';
import { Row } from 'react-table';
import { appFields } from 'constants/appFields';
import { booleanCount } from 'utils/totals';
import { Boolean } from 'components/Boolean';

export const SteamCloudEnabled = {
  accessor: appFields.STEAM_CLOUD_ENABLED,
  Cell: ({row}: {row: Row}) => (
    <Boolean value={row.values[appFields.STEAM_CLOUD_ENABLED]} />
  ),
  Footer: ({selectedFlatRows}: {selectedFlatRows: Row[]}) => {
    const total = useMemo(
      () => booleanCount(selectedFlatRows, appFields.STEAM_CLOUD_ENABLED),
      [selectedFlatRows]
    );

    return `${total} Steam Cloud game(s)`;
  },
  Header: 'Steam Cloud',
  minWidth: 52,
  type: 'boolean',
};
