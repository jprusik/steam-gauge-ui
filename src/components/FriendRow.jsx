import {Fragment} from 'react';
import {minutesToHours} from '../utils/math';
import {getCommonMultiplayerGames} from '../utils/friends';
import FriendSteamLoginStatus from './FriendSteamLoginStatus';
import FriendApps from './FriendApps';
import './FriendRow.scss';

const FriendRow = ({
  friendData,
  searchUserData,
  multiplayerApps = []
}) => {
  const {
    apps: friendApps = [],
    avatarfull: friendImage,
    personaname: friendUsername,
    profileurl: friendUrl,
    steamid: friendId,
  } = friendData || {};

  const userApps = searchUserData.apps || [];

  const friendCommonMultiplayerApps = getCommonMultiplayerGames({
    friendApps,
    multiplayerApps,
    userApps,
  });

  const mostTimePlayedCommonApp = friendCommonMultiplayerApps
    .reduce((mostPlayedApp, app) =>
      app.playtime_forever > mostPlayedApp.playtime_forever
      ? app
      : mostPlayedApp
    , friendCommonMultiplayerApps[0]);

  // TODO: display other multiplayer games not owned by the user
  return (
    <div key="content-body" className="row featurette friend-entry">
      <div className="col-xs-10 col-md-3">
        { friendImage &&
          <Fragment>
            <a href={friendUrl} target="_blank" rel="noopener noreferrer">
              <img
                className="friend-avatar"
                border="0"
                src={friendImage}
                rel={`avatar of ${friendUsername}`}
                alt={`avatar of ${friendUsername}`}
              />
            </a>
            <br/>
          </Fragment>
        }
        { friendUsername &&
          <Fragment>
            <a className="friend-persona" href={friendUrl} target="_blank" rel="noopener noreferrer">{friendUsername}</a>
            <br/>
          </Fragment>
        }
        <a className="friend-id" href={friendUrl} target="_blank" rel="noopener noreferrer">{friendId}</a>
        <br/>
        <br/>
        <FriendSteamLoginStatus user={friendData} />
        <br/>
        { mostTimePlayedCommonApp &&
          <Fragment>
            <div className="friend-most-played">
              <span className="most-common-description">Most played common game:</span>
              <br/>
              <span className="app-title">{mostTimePlayedCommonApp.name}</span> ({minutesToHours(mostTimePlayedCommonApp.playtime_forever)} hours)
            </div>
            <br/>
          </Fragment>
        }
        <a className="friend-message" href={`steam://friends/message/${friendId}`}>
          <i className="fa fa-comment"></i>Send a message to this friend
        </a>
      </div>
      <div className="col-xs-10 col-md-9">
        <ul className="friend-game-list multi-column">
          <FriendApps apps={friendCommonMultiplayerApps} users={{friend: friendData, user: searchUserData}} />
        </ul>
      </div>
    </div>
  );
};

export default FriendRow;
