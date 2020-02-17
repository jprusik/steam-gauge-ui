import React from 'react';
import {steamFriendsShareTwitter} from '../constants/urls';
import {
  groupMultiplayerAppsByAccountsOwnedByCount,
  groupMultiplayerAppsByAccountsPlaytime
} from '../utils/friends';
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

  const totalOwnedAppsCounts = groupMultiplayerAppsByAccountsOwnedByCount({
    userFriends,
    userApps,
    multiplayerApps
  });

  const mostOwnedCommonAppId = Object.keys(totalOwnedAppsCounts)
    .reduce((mostOwnedId, appId) =>
      totalOwnedAppsCounts[appId] > totalOwnedAppsCounts[mostOwnedId]
      ? appId
      : mostOwnedId
    , {});

  const mostOwnedCommonApp = userApps.find(({appid}) => `${appid}` === mostOwnedCommonAppId);

  const leastOwnedCommonAppId = Object.keys(totalOwnedAppsCounts)
    .reduce((mostOwnedId, appId) =>
      totalOwnedAppsCounts[appId] < totalOwnedAppsCounts[mostOwnedId]
      ? appId
      : mostOwnedId
    , {});

  const leastOwnedCommonApp = userApps.find(({appid}) => `${appid}` === leastOwnedCommonAppId);

  const totalOwnedAppsPlaytime = groupMultiplayerAppsByAccountsPlaytime({
    userFriends,
    userApps,
    multiplayerApps
  });

  const highestAveragePlaytimeCommonAppId = Object.keys(totalOwnedAppsPlaytime)
    .reduce((mostPlayedOnAverageId, appId) =>
      (totalOwnedAppsPlaytime[appId]/userFriendsCount) > (totalOwnedAppsPlaytime[mostPlayedOnAverageId]/userFriendsCount)
      ? appId
      : mostPlayedOnAverageId
    , {});

  const highestAveragePlaytimeCommonApp = userApps.find(({appid}) => `${appid}` === highestAveragePlaytimeCommonAppId);

  return (
    <div key="content-head" className="jumbotron">
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
          <strong>Share:</strong> <a className="custom-share twitter" href={steamFriendsShareTwitter(userId)}><i className="fa fa-twitter"></i></a>
        </div>
      </div>
    </div>
  );
};

export default FriendsSummary;
