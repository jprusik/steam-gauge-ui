import React from 'react';

export const TimeToBeat = ({
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
