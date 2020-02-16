import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import MetaTags from 'react-meta-tags';
import {
  fetchAccountApps,
  fetchAccountDetails,
  fetchFriendsList,
  fetchMultiplayerApps
} from '../actions';
import FriendsSummary from '../components/FriendsSummary';
import FriendRows from '../components/FriendRows';
import SearchForm from '../components/SearchForm';

const getAccountsApps = accountsDetails =>
  Promise.all(accountsDetails.map(async account => {
    const {steamid: accountId} = account || {};
    const {data: {games: accountAppsData} = {}} = await fetchAccountApps(accountId) || {};

    return {
      ...account,
      apps: accountAppsData
    };
  }));

const FriendsPage = () => {
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
      const userFriendsIds = userFriendsList.reduce((csvUsers, {steamid}) => steamid && `${csvUsers},${steamid}`, "")

      // add `searchedUserId` so we can get all accounts with one request
      const userAndFriendIds = `${searchedUserId},${userFriendsIds}`;

      const {data: accountsDetailsData} = await fetchAccountDetails(userAndFriendIds) || {};
      const {players: accountsDetails} = accountsDetailsData || {};

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

      <SearchForm {...{searchType:'friends', ...(!!searchedUserId && {hideLabel: true})}} />
      <br />
      { searchedUserId &&
        <FriendsSummary {...{userId: searchedUserId, ...userFriends}} />
      }
      { searchedUserId &&
        <FriendRows {...{userId: searchedUserId, ...userFriends}} />
      }
    </React.Fragment>
  );
}

export default FriendsPage;
