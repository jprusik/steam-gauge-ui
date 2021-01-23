import { useMemo } from 'react';
import { appFields } from 'constants/appFields';
import { booleanCount } from 'utils/totals';
import { Boolean } from 'components/Boolean';

export const WorkshopEnabled = {
  accessor: appFields.WORKSHOP_ENABLED,
  Cell: ({
    row: {
      values: { [appFields.WORKSHOP_ENABLED]: value },
    },
  }) => <Boolean value={value} />,
  Footer: ({ selectedFlatRows }) => {
    const total = useMemo(
      () => booleanCount(selectedFlatRows, appFields.WORKSHOP_ENABLED),
      [selectedFlatRows]
    );

    return `${total} Steam Workshop game(s)`;
  },
  Header: 'Steam Workshop',
  minWidth: 66,
  type: 'boolean',
};
