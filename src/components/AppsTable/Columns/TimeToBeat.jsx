import { appFields } from 'constants/appFields';
import {
  minutesToHours
} from 'utils/math';

export const TimeToBeat = {
  accessor: ({[appFields.TIME_TO_BEAT]: timeToBeat}) => {
    // @TODO: `time_to_beat` can be either null or undefined. Update
    // API to omit field values when no records are found.
    if (timeToBeat?.hltb_id) {
      const minutesToBeatValues = [
        ...(timeToBeat.minutes_to_beat_completionist > 0 ? [timeToBeat.minutes_to_beat_completionist] : []),
        ...(timeToBeat.minutes_to_beat_extras > 0 ? [timeToBeat.minutes_to_beat_extras] : []),
        ...(timeToBeat.minutes_to_beat_main_game > 0 ? [timeToBeat.minutes_to_beat_main_game] : [])
      ];

      const minutesToBeatMin = minutesToHours(Math.min(...minutesToBeatValues), 1);
      const minutesToBeatMax = minutesToHours(Math.max(...minutesToBeatValues), 1);

      return {
        minutesToBeatMin,
        minutesToBeatMax,
        hltbId: timeToBeat.hltb_id
      }
    }

    return {};
  },
  Cell: ({value}) => <TimeToBeatCellValue value={value} />,
  Header: 'Time to Beat',
  id: 'timeToBeat',
  minWidth: 50,
  sortType: (value, nextValue) => (
    (!value?.minutesToBeatMin || 0) >
    (!nextValue?.minutesToBeatMin || 0) ?
      -1 : 1
  ),
};

const TimeToBeatCellValue = ({
  value: {
    hltbId,
    minutesToBeatMax,
    minutesToBeatMin,
  }
}) => {
  if (!hltbId) {
    return null;
  }

  if (minutesToBeatMin === minutesToBeatMax) {
    return minutesToBeatMin === 0 ? null :
      <a href={`https://howlongtobeat.com/game.php?id=${hltbId}`}>{minutesToBeatMin} hours</a>;
  }

  return (
    <a href={`https://howlongtobeat.com/game.php?id=${hltbId}`}>
      min: {minutesToBeatMin} hours<br/>max: {minutesToBeatMax} hours
    </a>
  );
};
