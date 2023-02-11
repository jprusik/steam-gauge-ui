import {
  groupMultiplayerAppsByAccountsOwnedByCount,
  groupMultiplayerAppsByAccountsPlaytime
} from '../utils/friends';
import {ShareBar} from 'components/ShareBar';
import './FriendsSummary.scss';

const FriendsSummary = ({userId, accounts = [], multiplayerApps = []}) => {
  const user = accounts.find(account => account.steamid === userId);

  if (!user) {
    return null;
  }

  const {
    apps: userApps = [],
    personaname: userUsername = 'This user',
    profileurl: userUrl,
    avatarfull: userImage,
  } = user;

  const userFriends = accounts.filter(account => account.steamid !== userId);
  const userFriendsCount = userFriends.length;

  // Apps by owned count
  const totalOwnedAppsCounts = groupMultiplayerAppsByAccountsOwnedByCount({
    userFriends,
    userApps,
    multiplayerApps
  });

  const totalOwnedAppsCountsIds = Object.keys(totalOwnedAppsCounts);

  const mostOwnedCommonAppId = totalOwnedAppsCountsIds
    .reduce((mostOwnedId, appId) =>
      totalOwnedAppsCounts[appId] > totalOwnedAppsCounts[mostOwnedId]
        ? appId
        : mostOwnedId
    , totalOwnedAppsCountsIds[0]);

  const mostOwnedCommonApp = userApps.find(({appid}) => `${appid}` === mostOwnedCommonAppId);

  const leastOwnedCommonAppId = totalOwnedAppsCountsIds
    .reduce((mostOwnedId, appId) =>
      totalOwnedAppsCounts[appId] < totalOwnedAppsCounts[mostOwnedId]
        ? appId
        : mostOwnedId
    , totalOwnedAppsCountsIds[0]);

  const leastOwnedCommonApp = userApps.find(({appid}) => `${appid}` === leastOwnedCommonAppId);

  // Apps by playtime
  const totalOwnedAppsPlaytime = groupMultiplayerAppsByAccountsPlaytime({
    userFriends,
    userApps,
    multiplayerApps
  });

  const totalOwnedAppsPlaytimeIds = Object.keys(totalOwnedAppsPlaytime);

  const highestAveragePlaytimeCommonAppId = totalOwnedAppsPlaytimeIds
    .reduce((mostPlayedOnAverageId, appId) =>
      (totalOwnedAppsPlaytime[appId]/userFriendsCount) > (totalOwnedAppsPlaytime[mostPlayedOnAverageId]/userFriendsCount)
        ? appId
        : mostPlayedOnAverageId
    , totalOwnedAppsPlaytimeIds[0]);

  const highestAveragePlaytimeCommonApp = userApps.find(({appid}) => `${appid}` === highestAveragePlaytimeCommonAppId);

  return (
    <div className="jumbotron">
      <img className="useravatar" alt="user avatar" src={userImage}/>
      <h3 className="userhead">
        <a href={userUrl} target="_blank" rel="noopener noreferrer">{userUsername}</a> and {userFriendsCount} friends have these multiplayer games in common:
      </h3>
      <div className="row">
        { mostOwnedCommonApp &&
          <div className="col-xs-6">
            Most common among friends: <span className="app-title">{mostOwnedCommonApp.name}</span>
          </div>
        }
        { leastOwnedCommonApp &&
          <div className="col-xs-6">
            Least common among friends: <span className="app-title">{leastOwnedCommonApp.name}</span>
          </div>
        }
      </div>
      <div className="row">
        { highestAveragePlaytimeCommonApp &&
          <div className="col-xs-6">
            Most played among friends: <span className="app-title">{highestAveragePlaytimeCommonApp.name}</span>
          </div>
        }
        <div className="col-xs-6">
          <ShareBar
            message={`I just found out what multiplayer games my ${userFriendsCount} friends and I have in common by using MySteamGauge.com`}
            url={`${process.env.REACT_APP_DOMAIN_URL}/friends/${userId}`}
          />
        </div>
      </div>
    </div>
  );
};

export default FriendsSummary;
