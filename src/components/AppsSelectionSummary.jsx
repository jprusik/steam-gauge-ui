/** @jsx jsx */
import {Fragment, useState} from 'react';
import {css, jsx} from '@emotion/core';
import {timeSince} from '../utils/dates';
import ShareBar from './ShareBar';
import BugReportLink from './BugReportLink';
import BugReportingDetails from './BugReportingDetails';

const appsSelectionSummaryStyles = css`
  color: #eeeeee;
  font-style: italic;
  margin: 10px 0px;
`;

const secondaryItemsStyles = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SteamReceiptLinkStyles = css`
  flex: 3 1 auto;
  font-size: 0.75em;
  text-align: center;
`;

const AppsSelectionSummary = ({
  accountData: {
    steamid,
    timecreated
  },
  appsSelection = []
}) => {
  const [displayBugDetails, setDisplayBugDetails] = useState(false);

  const accountAge = timeSince(timecreated * 1000);
  const minutesPlayed = appsSelection.reduce((totalHours, {playtime_forever = 0}) => (totalHours + playtime_forever), 0);
  const hoursPlayed = Math.round(minutesPlayed / 60);
  const selectionCount = appsSelection.length;
  const usdSum = appsSelection.reduce((totalHours, {store_price_default_usd: usdPrice = 0}) => (totalHours + usdPrice), 0);
  const mbSum = appsSelection.reduce((totalMb, {size_mb = 0}) => (totalMb + size_mb), 0);
  const gbSum = Math.round((mbSum / 1000) * 10) / 10;

  return (
    <Fragment>
      <div css={appsSelectionSummaryStyles}>
          { timecreated && `Over the last ${accountAge}, ` }
          you've spent {hoursPlayed} hours playing this selection, which includes {selectionCount} items, is valued at ${usdSum}, and requires {gbSum} GB
      </div>
      <div css={secondaryItemsStyles}>
        <ShareBar
          message={`My #Steam account has ${selectionCount} items valued at $${usdSum} and requires ${gbSum} GB of disk space`}
          url={`${process.env.REACT_APP_DOMAIN_URL}/accounts/${steamid}`}
        />
        <a className="bookmarklet-link" css={SteamReceiptLinkStyles} href="{{ url_for('receipt') }}" target="_blank">Want to know how much you've <span className="italic">spent</span> on Steam?</a>
        <BugReportLink displayDetails={displayBugDetails} toggleDetails={setDisplayBugDetails} />
      </div>
      { displayBugDetails && <BugReportingDetails /> }
    </Fragment>
  );
};

export default AppsSelectionSummary;
