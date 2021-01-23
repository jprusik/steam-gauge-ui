import { useMemo } from 'react';
import { appFields } from 'constants/appFields';
import { booleanCount } from 'utils/totals';
import { Boolean } from 'components/Boolean';

export const Multiplayer = {
  accessor: appFields.MULTIPLAYER,
  Cell: ({
    row: {
      values: { [appFields.MULTIPLAYER]: value },
    },
  }) => <Boolean value={value} />,
  Footer: ({ selectedFlatRows }) => {
    const total = useMemo(
      () => booleanCount(selectedFlatRows, appFields.OS_LINUX),
      [selectedFlatRows]
    );

    return `${total} multiplayer game(s)`;
  },
  Header: 'Multiplayer',
  minWidth: 70,
};
