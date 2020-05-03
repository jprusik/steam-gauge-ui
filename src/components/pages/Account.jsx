import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import {
  fetchAccountApps,
  fetchAccountDetails,
  fetchAppDetails
} from '../../actions';
import SearchForm from '../SearchForm';
import AccountDetails from '../AccountDetails';
import AppsSelectionSummary from '../AppsSelectionSummary';
import AppsDetails from '../AppsDetails';
import {SectionLoader} from '../Loader';

const getAppsWithDetails = apps =>{
  // @TODO: cancel in-flight requests if page changes
  return Promise.all(apps.map(async app => {
    const {appid} = app || {};
    const {data: appDetails = {}} = appid ?
      await fetchAppDetails(appid, true) : {};

    return {
      ...appDetails,
      ...app
    };
  }))};

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
        }
      } = await fetchAccountApps(searchedUserId) || {data: {}};

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
  }, [searchedUserId]);

  function resetPageData() {
    setUserAccountDetails(null);
    setAccountApps([]);
    setAccountDetailsError(false);
    setAccountAppsError(false);
  }

  const selectedApps = accountApps.filter(({tableData: {checked} = {}} = {}) => !!checked);

  return (
    <React.Fragment>
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
            )
          }
        </div>
        { accountDetails && accountApps.length > 0 ? (
          <AppsSelectionSummary
            accountData={accountDetails}
            appsSelection={selectedApps.length > 0 ?
              selectedApps : accountApps
            }
          />
        ) : accountAppsError ? (
            <div>There was a problem fetching your library information from Steam. If this problem persists, make sure the <a href="https://steamcommunity.com/my/edit/settings" rel="noopener noreferrer">"Game details"</a> setting on your privacy page is set to "Public".</div>
          ) : (
            <SectionLoader />
          )
        }
        { accountApps.length > 0 ? (
          <AppsDetails
            accountApps={accountApps}
            detailsLoading={accountAppsDetailsLoading}
            setAccountApps={setAccountApps}
          />
        ) : accountAppsError ? null : (
          <div className={`jumbotron`} style={{marginTop: '20px'}}>
            <SectionLoader />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default AccountPage;
