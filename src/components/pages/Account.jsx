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

  useEffect(() => {
    async function getAccountData() {
      if (!searchedUserId) {
        return {};
      }

      const {data: {players: [accountData] = []} = {}} = await fetchAccountDetails(searchedUserId) || {};

      // @TODO Unhandled case: Some accounts return `data.response: {}`
      const {data: {games: accountApps} = {}} = await fetchAccountApps(searchedUserId) || {};

      setUserAccountDetails(accountData);
      setAccountApps(accountApps);

      // Get apps extended details
      const appsWithDetails = await getAppsWithDetails(accountApps);
      setAccountApps(appsWithDetails);
    }

    searchedUserId && getAccountData();
  }, [searchedUserId]);

  function resetPageData() {
    setUserAccountDetails(null);
    setAccountApps([])
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
            ) : (
              <SectionLoader />
            )}
          </div>
        { accountDetails && accountApps.length > 0 ? (
          <AppsSelectionSummary
            accountData={accountDetails}
            appsSelection={selectedApps.length > 0 ?
              selectedApps : accountApps
            }
          />
        ) : (
          <SectionLoader />
        )}
        { accountApps.length > 0 ? (
          <AppsDetails
            accountApps={accountApps}
            setAccountApps={setAccountApps}
          />
        ) : (
          <div className={`jumbotron`} style={{marginTop: '20px'}}>
            <SectionLoader />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default AccountPage;
