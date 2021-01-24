import {Fragment, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import {
  fetchAccountApps,
  fetchAccountDetails,
  fetchAppDetails,
} from 'actions';
import { AppsDetails } from 'components/AppsTable/AppsDetails';
import { SectionLoader } from 'components/Loader';
import AccountDetails from 'components/AccountDetails';
import { LibrarySummary } from 'components/LibrarySummary';
import SearchForm from 'components/SearchForm';

const controller = new AbortController();
const signal = controller.signal;

function abortRequests() {
  controller.abort();
}

const getAppsWithDetails = apps =>
  Promise.all(apps.map(async app => {
    const {appid} = app || {};
    const {data: appDetails = {}} = appid ?
      await fetchAppDetails(appid, true, signal) : {};

    return {
      ...appDetails,
      ...app
    };
  }));

const AccountPage = () => {
  const {id: searchedUserId} = useParams();
  const [accountDetails, setUserAccountDetails] = useState();
  const [accountApps, setAccountApps] = useState([]);
  const [accountDetailsError, setAccountDetailsError] = useState(false);
  const [accountAppsError, setAccountAppsError] = useState(false);
  const [accountAppsDetailsLoading, setAccountAppsDetailsLoading] = useState(false);

  useEffect(() => {
    async function getAccountData() {
      const {
        data: {
          players: [accountData] = []
        } = {},
        meta: {
          success: accountDataSuccess,
          error_key: accountDataErrorKey,
          code: accountDataErrorCode
        }
      } = await fetchAccountDetails(searchedUserId) || {data: {}};

      if (accountDataSuccess) {
        setUserAccountDetails(accountData);
      } else {
        setAccountDetailsError(accountDataErrorKey || `${accountDataErrorCode}`)
      }

      const {
        data: {
          games: accountApps
        } = {},
        meta: {
          success: appsDataSuccess,
          error_key: appsDataErrorKey,
          code: appsDataErrorCode
        } = {}
      } = await fetchAccountApps(searchedUserId) || {};

      if (appsDataSuccess) {
        setAccountApps(accountApps);

        setAccountAppsDetailsLoading(true);

        // Get apps extended details
        const appsWithDetails = await getAppsWithDetails(accountApps);
        setAccountApps(appsWithDetails);

        setAccountAppsDetailsLoading(false);
      } else {
        setAccountAppsError(appsDataErrorKey || `${appsDataErrorCode}`)
      }
    }

    searchedUserId && getAccountData();

    return () => getAccountData();
  }, [searchedUserId]);

  function resetPageData() {
    // async requests need to be cancelled before unmounting components
    abortRequests();
    setUserAccountDetails(null);
    setAccountApps([]);
    setAccountDetailsError(false);
    setAccountAppsError(false);
  }

  return (
    <Fragment>
      <MetaTags>
        {/* page metatags here */}
      </MetaTags>

      <div className="container">
        <SearchForm {...{
          searchType: 'account',
          onSearchSuccess: resetPageData,
          ...(!!searchedUserId && {hideLabel: true})
        }} />
        <br />
        <div className="jumbotron">
          { accountDetails ? (
            <AccountDetails accountData={accountDetails} />
          ) : accountDetailsError ? (
            <div>There was a problem fetching your account information from Steam. If this problem persists, check <a href="https://steamcommunity.com/my/edit/settings" rel="noopener noreferrer">your Steam privacy settings</a> and ensure the "My profile" setting is set to "Public".</div>
          ) : (
            <SectionLoader />
          )}
        </div>
        { accountDetails && accountApps.length > 0 ? (
          <LibrarySummary
            accountData={accountDetails}
            appsSelection={accountApps}
          />
        ) : accountAppsError ? (
          <div>There was a problem fetching your library information from Steam. If this problem persists, make sure the "Game details" setting on <a href="https://steamcommunity.com/my/edit/settings" rel="noopener noreferrer">your Steam privacy page</a> is set to "Public".</div>
        ) : (
          <SectionLoader />
        )}
        { accountApps.length > 0 && !accountAppsDetailsLoading ? (
          <AppsDetails data={accountApps} />
        ) : accountAppsError ? null : (
          <div className={`jumbotron`} style={{marginTop: '20px'}}>
            <SectionLoader />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AccountPage;
