import {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import styled from '@emotion/styled';
import {Account, App as AccountApp} from 'types';
import {timeSince} from 'utils/dates';
import {BugReportDropdown} from 'components/BugReportDropdown';
import {BugReportingDetails} from 'components/BugReportingDetails';
import {ShareBar} from 'components/ShareBar';
import {mbToGB, roundToPlaces} from 'utils/math';
import {numberValueSum} from 'utils/totals';

type LibrarySummaryProps = {
  accountData: Account;
  detailsLoading: boolean;
  libraryApps: AccountApp[];
}

export const LibrarySummary = ({
  accountData: {
    steamid,
    timecreated
  },
  detailsLoading,
  libraryApps = []
}: LibrarySummaryProps): JSX.Element => {
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
          to="/receipt"
          className="bookmarklet-link"
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

type SummaryData = {
  installSize: string;
  selectionCount: number;
  timePlayed: string;
  usdSum: number;
}

function summaryData (libraryApps: AccountApp[]): SummaryData {
  const minutesPlayed = numberValueSum(
    libraryApps,
    ({playtime_forever}: {playtime_forever: number}) => playtime_forever);
  const hoursPlayed = roundToPlaces(minutesPlayed / 60);
  const selectionCount = libraryApps.length;
  const usdSum = roundToPlaces(
    numberValueSum(
      libraryApps,
      ({store_price_default_usd}: {store_price_default_usd: number}) => store_price_default_usd),
    2
  );
  const mbSum = numberValueSum(
    libraryApps,
    ({size_mb}: {size_mb: number}) => size_mb);
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

const SteamReceiptLink = styled(Link)`
  flex: 3 1 auto;
  text-align: center;
  color: #8bb9e0;
  font-size: 0.75em;

  :hover {
    color: #337ab7;
  }
`;
