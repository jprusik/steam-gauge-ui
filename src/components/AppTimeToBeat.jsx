import React from 'react';
import {minutesToHours} from '../utils/math';

export const AppTimeToBeat = (props) => {
  const {
    hltb_id,
    minutes_to_beat_completionist,
    minutes_to_beat_extras,
    minutes_to_beat_main_game
  } = props || {};

  if (!hltb_id) {
    return null;
  }

  const minutesToBeatValues = [
    ...(minutes_to_beat_completionist > 0 ? [minutes_to_beat_completionist] : []),
    ...(minutes_to_beat_extras > 0 ? [minutes_to_beat_extras] : []),
    ...(minutes_to_beat_main_game > 0 ? [minutes_to_beat_main_game] : [])
  ];

  const minutesToBeatMin = minutesToHours(Math.min(...minutesToBeatValues), 1);
  const minutesToBeatMax = minutesToHours(Math.max(...minutesToBeatValues), 1);

  if (minutesToBeatMin === minutesToBeatMax) {
    return minutesToBeatMin === 0 ? null :
      <a href={`https://howlongtobeat.com/game.php?id=${hltb_id}`}>{minutesToBeatMin} hours</a>;
  }

  return (
    <a href={`https://howlongtobeat.com/game.php?id=${hltb_id}`}>
      min: {minutesToBeatMin} hours<br/>max: {minutesToBeatMax} hours
    </a>
  );
};
