/** @jsx jsx */
import React from 'react';
import {css, jsx} from '@emotion/core';
import {timeSince} from '../utils/dates';
import ShareBar from './ShareBar';


const appsSelectionSummaryStyles = css`
  color: #eeeeee;
  font-style: italic;
  margin: 10px 0px;
`;

const AppsSelectionSummary = ({
  accountData: {
    steamid,
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
    <React.Fragment>
      <div css={appsSelectionSummaryStyles}>
          { timecreated && `Over the last ${accountAge}, ` }
          you've spent {hoursPlayed} hours playing this selection, which includes {selectionCount} items, is valued at ${usdSum}, and requires {gbSum} GB
      </div>
      <ShareBar
        message={`My #Steam account has ${selectionCount} items valued at $${usdSum} and requires ${gbSum} GB of disk space`}
        url={`${process.env.REACT_APP_DOMAIN_URL}/accounts/${steamid}`}
      />
    </React.Fragment>
  );
};

export default AppsSelectionSummary;
