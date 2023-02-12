import {Fragment} from 'react';
import styled from '@emotion/styled';
import {Account, App} from 'types';
import {minutesToHours} from 'utils/math';
import {getCommonMultiplayerGames} from 'utils/friends';
import {FriendSteamLoginStatus} from 'components/FriendSteamLoginStatus';
import {FriendApps} from 'components/FriendApps';

type FriendRowProps = {
  friendData: Account & {apps: App[]};
  searchUserData: Account & {apps: App[]};
  multiplayerApps: App[];
}

export const FriendRow = ({
  friendData,
  searchUserData,
  multiplayerApps = []
}: FriendRowProps): JSX.Element => {
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
    <FriendEntry className="row featurette">
      <div className="col-xs-10 col-md-3">
        { friendImage &&
          <Fragment>
            <a href={friendUrl} target="_blank" rel="noopener noreferrer">
              <img
                className="friend-avatar"
                style={{'border': '0'}}
                src={friendImage}
                alt={`avatar of ${friendUsername}`}
              />
            </a>
            <br/>
          </Fragment>
        }
        { friendUsername &&
          <Fragment>
            <FriendPersona href={friendUrl} target="_blank" rel="noopener noreferrer">{friendUsername}</FriendPersona>
            <br/>
          </Fragment>
        }
        <a className="friend-id" href={friendUrl} target="_blank" rel="noopener noreferrer">{friendId}</a>
        <br/>
        <br/>
        {Number.isInteger(friendData?.personastate) && (
          <Fragment>
            <FriendSteamLoginStatus personaState={friendData.personastate} />
            <br/>
          </Fragment>
        )}
        {mostTimePlayedCommonApp &&
          <Fragment>
            <div>
              <MostCommonAppHeader>Most played common game:</MostCommonAppHeader>
              <br/>
              <MostCommonAppName>{mostTimePlayedCommonApp.name}</MostCommonAppName> ({minutesToHours(mostTimePlayedCommonApp.playtime_forever)} hours)
            </div>
            <br/>
          </Fragment>
        }
        <SendFriendMessageLink href={`steam://friends/message/${friendId}`}>
          <i className="fa fa-comment"></i>Send a message to this friend
        </SendFriendMessageLink>
      </div>
      <FriendApps
        apps={friendCommonMultiplayerApps}
        searchedUserName={searchUserData?.personaname}
        searchedUserFriendName={searchUserData?.personaname}
      />
    </FriendEntry>
  );
};

const FriendPersona = styled.a`
  font-size: 1.5em;
`;

const MostCommonAppHeader = styled.span`
  font-weight: bold;
  line-height: 1.5em;
`;

const MostCommonAppName = styled.span`
  font-style: italic;
`;

const SendFriendMessageLink = styled.a`
  .fa-comment {
    text-decoration: none;
    padding-right: 0.5em;
  }
`;

const FriendEntry = styled.div`
  padding: 1em 0;
  margin-right: 0;
  margin-left: 0;
  font-size: 0.75em;

  &:nth-of-type(odd) {
    background-color: #555553;
  }

  &:nth-of-type(even) {
    background-color: #333333;
  }
`;
