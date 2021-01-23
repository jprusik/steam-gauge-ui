import { appFields } from 'constants/appFields';
import { useMemo } from 'react';
import { booleanCount } from 'utils/totals';
import { Boolean } from 'components/Boolean';

export const SteamCloudEnabled = {
  accessor: appFields.STEAM_CLOUD_ENABLED,
  Cell: ({
    row: {
      values: { [appFields.STEAM_CLOUD_ENABLED]: value },
    },
  }) => <Boolean value={value} />,
  Footer: ({ selectedFlatRows }) => {
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
