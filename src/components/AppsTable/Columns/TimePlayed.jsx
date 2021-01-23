import { useMemo } from 'react';
import Remove from '@material-ui/icons/Remove';
import { appFields } from 'constants/appFields';
import { minutesToHours } from 'utils/math';
import { numberValueSum } from 'utils/totals';

export const TimePlayed = {
  accessor: appFields.PLAYTIME_FOREVER,
  Cell: ({
    row: {
      original: { [appFields.PLAYTIME_FOREVER]: value },
    },
  }) => <TimePlayedCellValue value={value} />,
  Footer: ({ selectedFlatRows }) => {
    const valueSum = useMemo(
      () => numberValueSum(selectedFlatRows, appFields.PLAYTIME_FOREVER),
      [selectedFlatRows]
    );

    return `Total: ${minutesToHours(valueSum)} hrs`;
  },
  Header: 'Hours Played',
  minWidth: 80,
  type: 'numeric',
};

const TimePlayedCellValue = ({ value }) =>
  value === 0 ? (
    'not played'
  ) : value > 0 ? (
    [
      <div key="total-hours">{minutesToHours(value, 1)} hours</div>,
      <div key="total-minutes">{value} minutes</div>,
    ]
  ) : (
    <Remove />
  );
