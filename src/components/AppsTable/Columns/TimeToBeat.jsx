import { appFields } from 'constants/appFields';
import {
  minutesToHours
} from 'utils/math';
import RemoveIcon from '@material-ui/icons/Remove';

export const TimeToBeat = {
  accessor: ({ [appFields.TIME_TO_BEAT]: timeToBeat }) => {
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
      }
    }

    return {};
  },
  Cell: ({ value }) => <TimeToBeatCellValue value={value} />,
  Header: 'Time to Beat',
  id: 'timeToBeat',
  minWidth: 50,
  sortType: ({ values: { timeToBeat } }, { values: { timeToBeat: nextTimeToBeat } }) => (
    (timeToBeat?.hoursToBeatMin || 0) >
      (nextTimeToBeat?.hoursToBeatMin || 0) ?
      -1 : 1
  ),
};

const TimeToBeatCellValue = ({
  value: {
    hltbId,
    hoursToBeatMax,
    hoursToBeatMin,
  }
}) => {
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
