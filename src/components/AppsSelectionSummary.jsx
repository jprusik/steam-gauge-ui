/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import {timeSince} from '../utils/dates';


const appsSelectionSummaryStyles = css`
  color: #eeeeee;
  font-style: italic;
  margin: 10px 0px;
`;

const AppsSelectionSummary = ({
  accountData: {
    timecreated
  },
  appsSelection = []
}) => {
  const accountAge = timeSince(timecreated * 1000);
  const minutesPlayed = appsSelection.reduce((totalHours, {playtime_forever = 0}) => (totalHours + playtime_forever), 0);
  const hoursPlayed = minutesPlayed / 60; // TODO: round to nearest whole hour
  const selectionCount = appsSelection.length;
  const usdSum = appsSelection.reduce((totalHours, {store_price_default_usd: usdPrice = 0}) => (totalHours + usdPrice), 0);
  const mbSum = appsSelection.reduce((totalMb, {size_mb = 0}) => (totalMb + size_mb), 0);
  const gbSum = mbSum / 1000; // TODO: round to nearest tenth

  return (
    <div css={appsSelectionSummaryStyles}>
        { timecreated && `Over the last ${accountAge}, ` }
        you've spent {hoursPlayed} hours playing this selection, which includes {selectionCount} items, is valued at ${usdSum}, and requires {gbSum} GB
    </div>
  );
};

export default AppsSelectionSummary;
