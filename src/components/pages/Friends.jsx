import {Fragment, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
  fetchAccountApps,
  fetchAccountDetails,
  fetchFriendsList,
  fetchMultiplayerApps
} from 'actions';
import {Home} from 'components/pages/Home';
import {FriendRows} from 'components/FriendRows';
import FriendsSummary from 'components/FriendsSummary';
import SearchForm from 'components/SearchForm';
import {SectionLoader} from 'components/Loader';

const getAccountsApps = accountsDetails =>
  Promise.all(accountsDetails.map(async account => {
    const {steamid: accountId} = account || {};
    const {data: accountAppsData = []} = await fetchAccountApps(accountId) || {};

    return {
      ...account,
      apps: accountAppsData
    };
  }));

const FriendsPage = ({user, setUser}) => {
  const {id: searchedUserId} = useParams();
  const [userFriends, setUserFriends] = useState();
  const [multiplayerAppsError, setMultiplayerAppsError] = useState(false);
  const [friendsListError, setFriendsListError] = useState(false);

  useEffect(() => {
    async function getUserFriendsData() {
      // Get list of multiplayer apps
      const {
        data: {
          applist: {
            apps: multiplayerApps = []
          } = {}
        } = {},
        meta: {
          success: multiplayerAppsSuccess,
          error_key: multiplayerAppsErrorKey,
          code: multiplayerAppsErrorCode
        } = {}
      } = await fetchMultiplayerApps() || {};

      if (!multiplayerAppsSuccess) {
        setMultiplayerAppsError(multiplayerAppsErrorKey || `${multiplayerAppsErrorCode}`);

        return;
      }

      // Get list of friends
      const {
        data: {
          friendslist: {
            friends: userFriendsList = []
          } = {}
        } = {},
        meta: {
          success: friendsListSuccess,
          error_key: friendsListErrorKey,
          code: friendsListErrorCode
        }
      } = await fetchFriendsList(searchedUserId) || {data: {}};

      if (!friendsListSuccess) {
        setFriendsListError(friendsListErrorKey || `${friendsListErrorCode}`);

        return;
      }

      // assemble comma-separated ids of all friends
      const userFriendsIds = userFriendsList
        .reduce((csvUsers, {steamid}) => steamid && `${csvUsers},${steamid}`, '');

      // add `searchedUserId` so we can get all accounts with one request
      // @TODO The api is currently limited to 100 ids
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

    searchedUserId && getUserFriendsData();

    return () => getUserFriendsData();
  }, [searchedUserId]);

  function resetPageData() {
    setUserFriends(null);
  }

  return !searchedUserId ? (
    <Home {...{isFriends: true, setUser, user}} />
  ) : (
    <Fragment>
      <SearchForm {...{
        searchType:'friends',
        onSearchSuccess: resetPageData,
        ...(!!searchedUserId && {hideLabel: true})
      }} />
      <br />
      { userFriends ? (
        <Fragment>
          <FriendsSummary {...{userId: searchedUserId, ...userFriends}} />
          <FriendRows {...{userId: searchedUserId, ...userFriends}} />
        </Fragment>
      ) : friendsListError ? (
        <div>There was a problem fetching your list of friends from Steam. If this problem persists, make sure the "Friends List" setting on <a href="https://steamcommunity.com/my/edit/settings" rel="noopener noreferrer">your Steam privacy page</a> is set to "Public".</div>
      ) : multiplayerAppsError ? (
        <div>There was a problem fetching the multiplayer list.</div>
      ) : (
        <SectionLoader />
      )}
    </Fragment>
  );
};

export default FriendsPage;
