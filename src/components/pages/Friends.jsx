import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchAccountApps,
  fetchAccountDetails,
  fetchFriendsList,
  fetchMultiplayerApps,
} from "actions";
import { Home } from "components/pages/Home";
import { FriendRows } from "components/FriendRows";
import FriendsSummary from "components/FriendsSummary";
import { SearchForm } from "components/SearchForm";
import { SectionLoader } from "components/Loader";

const controller = new AbortController();
const signal = controller.signal;

function abortRequests() {
  controller.abort();
}

const getAccountsApps = (accountsDetails) =>
  Promise.all(
    accountsDetails.map(async (account) => {
      const { steamid: accountId } = account || {};
      const {
        meta: { success, message_key },
        data: accountAppsData = [],
      } = (await fetchAccountApps(accountId)) || { data: [] };
      const errorMessageKeys = [
        ...(account?.errorMessageKeys || []),
        ...(!success && message_key ? [message_key] : []),
      ];

      return {
        ...account,
        errorMessageKeys,
        apps: accountAppsData || [],
      };
    }),
  );

const FriendsPage = ({ user, setUser }) => {
  const { id: searchedUserId } = useParams();
  const [userFriends, setUserFriends] = useState();
  const [multiplayerAppsError, setMultiplayerAppsError] = useState(false);
  const [friendsListError, setFriendsListError] = useState(false);

  useEffect(() => {
    async function getUserFriendsData() {
      // Get list of multiplayer apps
      const {
        data: multiplayerApps = [],
        meta: {
          success: multiplayerAppsSuccess,
          message_key: multiplayerAppsMessageKey,
        } = {},
      } = (await fetchMultiplayerApps()) || {};

      if (!multiplayerAppsSuccess) {
        setMultiplayerAppsError(
          multiplayerAppsMessageKey ||
            errorMessage.FETCH_MULTIPLAYER_APPS_FAILED,
        );

        return;
      }

      // Get list of friends
      const {
        data: userFriendsList = [],
        meta: {
          success: friendsListSuccess,
          message_key: friendsListMessageKey,
        },
      } = (await fetchFriendsList(searchedUserId)) || { data: [] };

      if (!friendsListSuccess) {
        setFriendsListError(
          friendsListMessageKey ||
            errorMessage.FETCH_ACCOUNT_FRIENDS_LIST_FAILED,
        );

        return;
      }

      // assemble comma-separated ids of all friends
      const userFriendsIds = userFriendsList.reduce(
        (userIdList, { steamid }) => {
          if (steamid) {
            return [...userIdList, steamid];
          }

          return userIdList;
        },
        [],
      );
      // add `searchedUserId` so we can get all accounts with one request
      // @TODO The api is currently limited to 100 ids
      const userAndFriendIds = [searchedUserId, ...userFriendsIds].join(",");

      const { data: accountsDetailsData } =
        (await fetchAccountDetails(userAndFriendIds)) || {};
      const accountsDetails = accountsDetailsData || [];

      // TODO: if the user account has no apps, skip making any other calls and
      // render some useful user feedback.
      const accounts = await getAccountsApps(accountsDetails);

      // This multiplayer apps array is over 200k records long; mapping is expensive (especially given later iterations)
      const filteredMultiplayerApps = multiplayerApps.map(({ appid }) => appid);

      setUserFriends({
        accounts,
        multiplayerApps: filteredMultiplayerApps,
      });
    }

    searchedUserId && getUserFriendsData();

    return () => getUserFriendsData();
  }, [searchedUserId]);

  function resetPageData() {
    abortRequests();
    setUserFriends(null);
  }

  return !searchedUserId ? (
    <Home {...{ isFriends: true, setUser, user }} />
  ) : (
    <Fragment>
      <SearchForm
        {...{
          searchType: "friends",
          onSearchSuccess: resetPageData,
          ...(!!searchedUserId && { hideLabel: true }),
        }}
      />
      <br />
      {userFriends ? (
        <Fragment>
          <FriendsSummary {...{ userId: searchedUserId, ...userFriends }} />
          <FriendRows {...{ userId: searchedUserId, ...userFriends }} />
        </Fragment>
      ) : friendsListError ? (
        <div>
          There was a problem fetching your list of friends from Steam. If this
          problem persists, make sure the "Friends List" setting on{" "}
          <a
            href="https://steamcommunity.com/my/edit/settings"
            rel="noopener noreferrer"
          >
            your Steam privacy page
          </a>{" "}
          is set to "Public".
        </div>
      ) : multiplayerAppsError ? (
        <div>There was a problem fetching the multiplayer list.</div>
      ) : (
        <SectionLoader />
      )}
    </Fragment>
  );
};

export default FriendsPage;
