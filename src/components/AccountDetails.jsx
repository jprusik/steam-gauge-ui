/** @jsx jsx */
import React from 'react';
import {css, jsx} from '@emotion/core';
import {personaStateMap} from '../constants/personaStates';
import {accountCreationDate, timeSince} from '../utils/dates';
import ShareBar from './ShareBar';


const userAvatarStyles = css`
  @media only screen and (max-width:640px) {
    width:100%;
    max-width:184px;
    min-width:80px;
  }
`;

const personaStateStyles = (personastate) => css`
  font-size:0.7em;

  :before {
    -webkit-font-smoothing:antialiased;
    color: ${personaStateMap[personastate].color};
    content: "${personaStateMap[personastate].iconCharacter}";
    display: inline-block;
    font-family: FontAwesome;
    margin: 0px 0.25em 0px 0.75em;
    min-width: 1em;
    speak: none;
    text-decoration: inherit;
  }
`;

const profileNameStyles = css`
  font-family: ImpactEmb, Impact, Helvetica, Arial, sans-serif;
  font-size: 2em;
  font-weight: normal;
  letter-spacing: 1px;
  line-height: 1em;
  margin: 0px;
  text-shadow: #3d3d3d 2px 2px 1px;
`;

const AccountDetails = ({
  accountData: {
    avatar,
    avatarfull,
    avatarmedium,
    cityid,
    communityvisibilitystate,
    gameextrainfo,
    lastlogoff,
    loccityid,
    loccountrycode,
    locstatecode,
    personaname,
    personastate,
    personastateflags,
    primaryclanid,
    profilestate,
    profileurl,
    realname,
    steamid,
    timecreated
  },
  toggleModal
}) => (
  <table>
    <tbody>
      <tr>
        <td css={css`vertical-align: top; padding: 10px 0px; max-width: 184px;`}>
          { avatarfull &&
            <React.Fragment>
              <img css={userAvatarStyles} src={avatarfull} alt="user avatar" />
              <ShareBar accountId={steamid} />
              <div css={css`line-height: 1em; color: #8bb9e0; font-size: 0.75em; cursor: pointer;`}>
                <a onClick={toggleModal(true)}><i className="fa fa-bug"></i>&nbsp;Something off? Report bugs here.</a>
              </div>
            </React.Fragment>
          }
        </td>
        <td css={css`vertical-align: top; padding: 10px;`}>
          <h2 css={profileNameStyles}>
            <a
              css={css`color: #eee!important; text-shadow: #2a2a2a 1px 1px 0px;`} // !important bootstrap override
              href={`https://steamcommunity.com/profiles/${steamid}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {personaname || steamid}
            </a>
          </h2>
          { personaname &&
            <h4>Steam ID: <a css={css`color: #8bb9e0`} href={`https://steamcommunity.com/profiles/${steamid}`} target="_blank" rel="noopener noreferrer">{steamid}</a></h4>
          }

          <div>
            <React.Fragment>
              <span css={css`font-weight: bold; font-size: 0.75em;`}>This user's status is: </span>
              <span css={personaStateStyles(personastate)}>
                { personaStateMap[personastate].name }
              </span>
            </React.Fragment>

            <div css={css`color: #eeeeee; font-weight: bold; padding: 0px; font-size: 0.75em;`}>
              { timecreated && timecreated !== 0 && (
                <React.Fragment>
                  Steam user since { accountCreationDate(timecreated) }
                </React.Fragment>
              )}
              <br />
              { realname && <span id="user_realname">{realname} | </span> }
              { cityid && <span id="user_cityid">{cityid}, </span> }
              { locstatecode && <span id="user_state">{locstatecode}, </span> }
              { loccountrycode && <span id="user_country">{loccountrycode}</span> }
              <br />
              <br />
              { lastlogoff &&
                <React.Fragment>
                  Last logoff: <span id="last_logoff_datetime" title={accountCreationDate(timecreated)}>{timeSince(lastlogoff * 1000)} ago</span>
                </React.Fragment>
              }
              { gameextrainfo &&
                <React.Fragment>
                  <br />Currently Playing: <span id="current_app">{gameextrainfo}</span>
                </React.Fragment>
              }
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
);

export default AccountDetails;
