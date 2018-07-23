import React from 'react';

import './friendRow.scss';

const friendSteamLoginStatus = (personastate) => {
  // TODO: Move to shared constants
  const personaStateMap = {
    '0': {'name': 'Offline', 'class': 'ban'},
    '1': {'name': 'Online', 'class': 'circle'},
    '2': {'name': 'Busy', 'class': 'adjust'},
    '3': {'name': 'Away', 'class': 'adjust'},
    '4': {'name': 'on Snooze', 'class': 'adjust'},
    '5': {'name': 'looking to trade', 'class': 'adjust'},
    '6': {'name': 'looking to play', 'class': 'adjust'}
  }

  const stateText = personaStateMap[personastate].name;
  const stateClass = personaStateMap[personastate].class;

  return (
    <div className="friend-status">
      <span className="friend-current-game">This user is currently:</span>
      <br/>
      <i className={`fa fa-${stateClass}`}></i>{stateText}
    </div>
  )
};

const FriendRow = ({ friendData, searchUserData }) => {
  const commonApps = friendData.apps || [];
  const mostCommonPlayed = { 'name': 'App Name', 'playTimeHours': 0.0 };

  const appRow = (apps) => {
    if (apps.length > 0) {
      return apps.map(app => <li className="friend-gamerow">app.name</li>);
    }
    return <li>This user has no multiplayer games in common with { searchUserData.personaname }</li>
  }

  return (
    <div key="content-body" className="row featurette friend-entry">
      <div className="col-xs-10 col-md-3">
        <a href={friendData.profileurl} target="_blank" rel="noopener noreferrer">
          <img className="friend-avatar" border="0" src={`${friendData.avatarfull}`}
            rel={`avatar of ${friendData.personaname}`} alt={`avatar of ${friendData.personaname}`}/>
        </a>
        <br/>
        <a className="friend-persona" href={friendData.profileurl} target="_blank" rel="noopener noreferrer">{friendData.personaname}</a>
        <br/>
        <a className="friend-id" href={friendData.profileurl} target="_blank" rel="noopener noreferrer">{friendData.steamid}</a>
        <br/>
        <br/>
        { friendSteamLoginStatus(friendData.personastate) }
        <br/>
        <div className="friend-most-played">
          <span className="most-common-description">Most played common game:</span>
          <br/>
          <span className="app-title">{mostCommonPlayed.name}</span> ({mostCommonPlayed.playTimeHours} hours)
        </div>
        <br/>
        <a className="friend-message" href={`steam://friends/message/${friendData.steamid}`}>
          <i className="fa fa-comment"></i>Send a message to this friend
        </a>
      </div>
      <div className="col-xs-10 col-md-9">
        <ul className="friend-game-list multi-column">
          { appRow(commonApps) }
        </ul>
      </div>
    </div>
  );
};

export default FriendRow;
