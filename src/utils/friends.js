export const getUserMultiplayerAppIds = (
  userApps = [],
  multiplayerApps = []
) => {
  // @TODO This is comically inefficient, especially considering the multiplayer game list is over 200k records long...
  return userApps
    .filter(({ appid }) => multiplayerApps.includes(appid))
    .map(({ appid }) => appid);
};

// Return all multiplayer apps the friend has in common with the user
export const getCommonMultiplayerGames = ({
  multiplayerApps = [],
  userApps = [],
  friendApps = [],
}) =>
  friendApps.filter(({ appid }) =>
    getUserMultiplayerAppIds(userApps, multiplayerApps).includes(appid)
  );

export const groupMultiplayerAppsByAccountsOwnedByCount = ({
  userFriends = [],
  userApps = [],
  multiplayerApps = [],
}) => {
  const userMultiplayerAppIds = getUserMultiplayerAppIds(
    userApps,
    multiplayerApps
  );

  return userFriends.reduce((appsOwnedCounts, { apps = [] }) => {
    apps.forEach(({ appid }) => {
      if (!userMultiplayerAppIds.includes(appid)) {
        return appsOwnedCounts;
      }

      if (!appsOwnedCounts[appid]) {
        appsOwnedCounts[appid] = 0;
      }

      appsOwnedCounts[appid]++;
    });

    return appsOwnedCounts;
  }, {});
};

export const groupMultiplayerAppsByAccountsPlaytime = ({
  multiplayerApps = [],
  userApps = [],
  userFriends = [],
}) => {
  const userMultiplayerAppIds = getUserMultiplayerAppIds(
    userApps,
    multiplayerApps
  );

  return userFriends.reduce((appsOwnedPlaytime, { apps = [] }) => {
    apps.forEach(({ appid, playtime_forever }) => {
      // If the app's playtime isn't present (e.g. due to user privacy settings),
      // skip it
      if (!playtime_forever || !userMultiplayerAppIds.includes(appid)) {
        return appsOwnedPlaytime;
      }

      if (!appsOwnedPlaytime[appid]) {
        appsOwnedPlaytime[appid] = 0;
      }

      appsOwnedPlaytime[appid] += playtime_forever;
    });

    return appsOwnedPlaytime;
  }, {});
};
