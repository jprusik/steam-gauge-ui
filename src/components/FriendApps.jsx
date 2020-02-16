import React from 'react';
import {minutesToHours} from '../utils/math'

const FriendAppRows = ({
  apps,
  users: {
    friend: {
      personaname: friendName = 'This user'
    } = {},
    user: {
      personaname: userName = 'the searched account'
    } = {}
  } = {}
}) => apps.length > 0
  ? apps
    .sort(
      ({name}, {name: nextName}) => name.localeCompare(nextName)
    )
    .map(app => (
        <li key={app.appid} className="friend-gamerow">
          {app.name} <small>({minutesToHours(app.playtime_forever)} hours)</small>
        </li>
      ))
  : (
    <li>
      <strong>{friendName}</strong> has no multiplayer games in common with <strong>{userName}</strong>
    </li>
  );

export default FriendAppRows;
