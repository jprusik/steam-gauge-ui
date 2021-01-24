import {Fragment, useState} from 'react';
import styled from '@emotion/styled';
import {timeSince} from 'utils/dates';
import ShareBar from 'components/ShareBar';
import { BugReportDropdown } from 'components/BugReportDropdown';
import { BugReportingDetails } from 'components/BugReportingDetails';

export const LibrarySummary = ({
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
      <SummaryText>
        { timecreated && `Over the last ${accountAge}, ` }
        you've spent {hoursPlayed} hours playing this library, which includes {selectionCount} items, is valued at ${usdSum}, and requires {gbSum} GB of disk space
      </SummaryText>
      <SecondaryItems>
        <ShareBar
          message={`My #Steam account has ${selectionCount} items valued at $${usdSum} and requires ${gbSum} GB of disk space`}
          url={`${process.env.REACT_APP_DOMAIN_URL}/accounts/${steamid}`}
        />
        <SteamReceiptLink
          className="bookmarklet-link"
          href="{{ url_for('receipt') }}"
          target="_blank"
        >
          Want to know how much you've <em>spent</em> on Steam?
        </SteamReceiptLink>
        <BugReportDropdown
          displayDetails={displayBugDetails}
          toggleDetails={setDisplayBugDetails}
        />
      </SecondaryItems>
      { displayBugDetails && <BugReportingDetails /> }
    </Fragment>
  );
};

const SummaryText = styled.div`
  margin: 10px 0px;
  color: #eeeeee;
  font-style: italic;
`;

const SecondaryItems = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SteamReceiptLink = styled.a`
  flex: 3 1 auto;
  text-align: center;
  color: #8bb9e0;
  font-size: 0.75em;

  :hover {
    color: #337ab7;
  }
`;
