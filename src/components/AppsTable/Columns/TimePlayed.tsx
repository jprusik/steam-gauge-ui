import { useMemo } from 'react';
import { Row } from 'react-table';
import { appFields } from 'constants/appFields';
import { minutesToHours } from 'utils/math';
import { numberValueAverage, numberValueSum } from 'utils/totals';

export const TimePlayed = {
  accessor: appFields.PLAYTIME_FOREVER,
  Cell: ({row}: {row: Row & {original: any}}) => (
    getTimePlayedCellValue(row.original[appFields.PLAYTIME_FOREVER])
  ),
  Footer: ({selectedFlatRows}: {selectedFlatRows: Row[]}) => {
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
        <div>{getMinutesOrHours(valueSum)} (total)</div>
        {valueAverage ? (
          <div>{getMinutesOrHours(valueAverage)} (average)</div>
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

const getTimePlayedCellValue = (value: number) =>
  value === 0 ? 'not played' : getMinutesOrHours(value);

const getMinutesOrHours = (value: number) =>
  value > 60 ?
    `${minutesToHours(value, 1)} hour(s)` :
    `${value} minute(s)`;
