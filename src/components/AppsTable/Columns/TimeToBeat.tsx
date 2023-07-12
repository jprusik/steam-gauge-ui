import { useMemo } from 'react';
import { Row } from 'react-table';
import { TimeToBeat as TimeToBeatRecord } from 'types';
import RemoveIcon from '@mui/icons-material/Remove';
import { appFields } from 'constants/appFields';
import { numberValueAverage, numberValueSum } from 'utils/totals';
import { minutesToHours } from 'utils/math';
import { roundToPlaces } from 'utils/math';

export const TimeToBeat = {
  accessor: ({
    [appFields.TIME_TO_BEAT]: timeToBeat
  }: {[appFields.TIME_TO_BEAT]: TimeToBeatRecord}) => {
    // @TODO: `time_to_beat` can be either null or undefined. Update
    // API to omit field values when no records are found.
    if (timeToBeat?.hltb_id) {
      const minutesToBeatValues = [
        ...(timeToBeat.minutes_to_beat_completionist > 0 ? [timeToBeat.minutes_to_beat_completionist] : []),
        ...(timeToBeat.minutes_to_beat_extras > 0 ? [timeToBeat.minutes_to_beat_extras] : []),
        ...(timeToBeat.minutes_to_beat_main_game > 0 ? [timeToBeat.minutes_to_beat_main_game] : [])
      ];

      const hoursToBeatMin = minutesToHours(Math.min(...minutesToBeatValues), 1);
      const hoursToBeatMax = minutesToHours(Math.max(...minutesToBeatValues), 1);

      return {
        hoursToBeatMin,
        hoursToBeatMax,
        hltbId: timeToBeat.hltb_id
      };
    }

    return {};
  },
  Cell: ({value}: TimeToBeatCellValueProps) => (
    <TimeToBeatCellValue value={value} />
  ),
  Footer: ({selectedFlatRows}: {selectedFlatRows: Row[]}) => {
    const {valueSum, valueAverage} = useMemo(
      () => {
        return ({
          valueSum: numberValueSum(selectedFlatRows, minTimeToBeatSelector),
          valueAverage: numberValueAverage(selectedFlatRows, minTimeToBeatSelector)
        });
      },
      [selectedFlatRows]
    );

    return (
      <div>
        <div>{roundToPlaces(valueSum, 2)} (total)</div>
        {valueAverage ? (
          <div>{valueAverage} (average)</div>
        ) :
          null
        }
      </div>
    );
  },
  Header: 'Time to Beat',
  id: 'timeToBeat',
  minWidth: 50,
  sortType: (
    {values: {timeToBeat}}:
      {values: {timeToBeat: TimeToBeatAccessorData}},
    {values: {timeToBeat: nextTimeToBeat}}:
      {values: {timeToBeat: TimeToBeatAccessorData}}
  ) => (
    (timeToBeat?.hoursToBeatMin || 0) >
      (nextTimeToBeat?.hoursToBeatMin || 0) ?
      -1 : 1
  ),
};

const minTimeToBeatSelector = ({
  values
}: {values: {timeToBeat: TimeToBeatAccessorData}}) =>
  values.timeToBeat?.hoursToBeatMin;

type TimeToBeatAccessorData = {
  hltbId: string;
  hoursToBeatMax: number;
  hoursToBeatMin: number;
}

type TimeToBeatCellValueProps = {
  value: TimeToBeatAccessorData
}

const TimeToBeatCellValue = ({
  value: {
    hltbId,
    hoursToBeatMax,
    hoursToBeatMin,
  }
}: TimeToBeatCellValueProps) => {
  if (!hltbId) {
    return <RemoveIcon />;
  }

  if (hoursToBeatMin === hoursToBeatMax) {
    return hoursToBeatMin === 0 ? null :
      <a href={`https://howlongtobeat.com/game.php?id=${hltbId}`}>{hoursToBeatMin} hours</a>;
  }

  return (
    <a href={`https://howlongtobeat.com/game.php?id=${hltbId}`}>
      min: {hoursToBeatMin} hours<br />max: {hoursToBeatMax} hours
    </a>
  );
};
