import {Fragment, useState} from 'react';
import styled from '@emotion/styled';
import {timeSince} from 'utils/dates';
import ShareBar from 'components/ShareBar';
import { BugReportDropdown } from 'components/BugReportDropdown';
import { BugReportingDetails } from 'components/BugReportingDetails';
import { mbToGB, roundToPlaces } from 'utils/math';
import { numberValueSum } from 'utils/totals';

export const LibrarySummary = ({
  accountData: {
    steamid,
    timecreated
  },
  detailsLoading,
  libraryApps = []
}) => {
  const [displayBugDetails, setDisplayBugDetails] = useState(false);
  const accountAge = timeSince(timecreated * 1000);

  const {
    installSize,
    selectionCount,
    timePlayed,
    usdSum,
  } = summaryData(libraryApps);

  // @TODO: use i18n library for proper string handling
  return (
    <Fragment>
      <SummaryText>
        { timecreated && `Over the last ${accountAge}, ` }
        {timePlayed} have been spent playing this library, which includes {selectionCount} items
        { !detailsLoading && `, is valued at ${usdSum}, and requires ${installSize} of disk space`}
      </SummaryText>
      <SecondaryItems>
        <ShareBar
          message={`My #Steam account has ${selectionCount} apps valued at $${usdSum} and requires ${installSize} of disk space`}
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

function summaryData (libraryApps) {
  const minutesPlayed = numberValueSum(libraryApps, ({playtime_forever}) => playtime_forever);
  const hoursPlayed = roundToPlaces(minutesPlayed / 60);
  const selectionCount = libraryApps.length;
  const usdSum = roundToPlaces(
    numberValueSum(libraryApps, ({store_price_default_usd}) => store_price_default_usd),
    2
  );
  const mbSum = numberValueSum(libraryApps, ({size_mb}) => size_mb);
  const gbSum = mbToGB(mbSum, 1);

  return {
    installSize: mbSum > 1000 ? `${gbSum} GB` : `${mbSum} MB`,
    selectionCount,
    timePlayed: minutesPlayed > 60 ?
      `${hoursPlayed} ${hoursPlayed === 1 ? 'hour' : 'hours'}` :
      `${minutesPlayed} ${minutesPlayed === 1 ? 'minute' : 'minutes'}`,
    usdSum,
  };
}

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
