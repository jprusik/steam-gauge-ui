import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import {
  fetchAccountApps,
  fetchAccountDetails,
  fetchFriendsList,
  fetchMultiplayerApps
} from '../../actions';
import FriendRows from '../FriendRows';
import FriendsSummary from '../FriendsSummary';
import SearchForm from '../SearchForm';
import TitleIntro from '../TitleIntro';
import AccountOptions from '../AccountOptions';
import SpecialNotice from '../SpecialNotice';

const getAccountsApps = accountsDetails =>
  Promise.all(accountsDetails.map(async account => {
    const {steamid: accountId} = account || {};
    const {data: {games: accountAppsData} = {}} = await fetchAccountApps(accountId) || {};

    return {
      ...account,
      apps: accountAppsData
    };
  }));

const FriendsPage = ({user}) => {
  const {id: searchedUserId} = useParams();
  const [userFriends, setUserFriends] = useState();

  useEffect(() => {
    async function getUserFriendsData() {
      if (!searchedUserId) {
        return {};
      }

      const {data: multiplayerAppsData} = await fetchMultiplayerApps() || {};
      const {data: friendsListData} = await fetchFriendsList(searchedUserId) || {};

      const {
        applist: {
          apps: multiplayerApps = []
        } = {}
      } = multiplayerAppsData || {};

      const {
        friendslist: {
          friends: userFriendsList = []
        } = {}
      } = friendsListData || {}

      // assemble comma-separated ids of all friends
      const userFriendsIds = userFriendsList
        .reduce((csvUsers, {steamid}) => steamid && `${csvUsers},${steamid}`, '')

      // add `searchedUserId` so we can get all accounts with one request
      const userAndFriendIds = `${searchedUserId},${userFriendsIds}`;

      const {data: accountsDetailsData} = await fetchAccountDetails(userAndFriendIds) || {};
      const {players: accountsDetails} = accountsDetailsData || {};

      // TODO: if the user account has no apps, skip making any other calls and
      // render some useful user feedback.
      const accounts = await getAccountsApps(accountsDetails);

      setUserFriends({
        accounts,
        multiplayerApps: multiplayerApps
          .reduce((list, {appid}) => [...list, appid], [])
      });
    }

    getUserFriendsData();
  }, [searchedUserId]);

  return (
    <React.Fragment>
      <MetaTags key="content-meta">
        {/* page metatags here */}
      </MetaTags>

      { !searchedUserId && <TitleIntro isFriends /> }

      <SearchForm {...{searchType:'friends', ...(!!searchedUserId && {hideLabel: true})}} />

      { !searchedUserId &&
        <React.Fragment>
          <div className="option-divider">or</div>
          <AccountOptions user={user} />
          <div className="spacer"></div>
          <SpecialNotice />
        </React.Fragment>
      }

      { searchedUserId &&
        <React.Fragment>
          <br />
          <FriendsSummary {...{userId: searchedUserId, ...userFriends}} />
          <FriendRows {...{userId: searchedUserId, ...userFriends}} />
        </React.Fragment>
      }
    </React.Fragment>
  );
}

export default FriendsPage;
