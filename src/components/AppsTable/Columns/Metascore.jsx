import { useMemo } from 'react';
import { appFields } from 'constants/appFields';
import { numberValueAverage } from 'utils/totals';

export const Metascore = {
  accessor: appFields.METASCORE,
  Cell: ({
    row: {
      values: {
        [appFields.METASCORE]: metascore,
        [appFields.METASCORE_LINK]: metascore_link,
      },
    },
  }) => <a href={metascore_link}>{metascore}</a>,
  Footer: ({ selectedFlatRows }) => {
    const valueAverage = useMemo(
      () => numberValueAverage(selectedFlatRows, appFields.METASCORE),
      [selectedFlatRows]
    );

    return valueAverage ? `${valueAverage} (average)` : null;
  },
  Header: 'Metascore',
  minWidth: 61,
  type: 'numeric',
};
