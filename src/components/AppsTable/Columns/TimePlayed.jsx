import { useMemo } from 'react';
import { appFields } from 'constants/appFields';
import { minutesToHours } from 'utils/math';
import { numberValueAverage, numberValueSum } from 'utils/totals';

export const TimePlayed = {
  accessor: appFields.PLAYTIME_FOREVER,
  Cell: ({
    row: {
      original: { [appFields.PLAYTIME_FOREVER]: value },
    },
  }) => <TimePlayedCellValue value={value} />,
  Footer: ({ selectedFlatRows }) => {
    const { valueAverage, valueSum } = useMemo(
      () => ({
        valueAverage:
          numberValueAverage(selectedFlatRows, appFields.PLAYTIME_FOREVER),
        valueSum:
          numberValueSum(selectedFlatRows, appFields.PLAYTIME_FOREVER),
      }),
      [selectedFlatRows]
    );

    return (
      <div>
        <div>{minutesOrHours(valueSum)} (total)</div>
        {valueAverage ? (
          <div>{minutesOrHours(valueAverage)} (average)</div>
        ) :
          null
        }
      </div>
    );
  },
  Header: 'Hours Played',
  minWidth: 80,
  type: 'numeric',
};

const TimePlayedCellValue = ({ value }) =>
  value === 0 ? 'not played' : minutesOrHours(value);

const minutesOrHours = (value) =>
  value > 60 ?
    `${minutesToHours(value, 1)} hour(s)` :
    `${value} minute(s)`;
