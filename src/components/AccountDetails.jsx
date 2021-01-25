/** @jsxImportSource @emotion/react */
import {Fragment} from 'react';
import {css} from '@emotion/core';
import {accountCreationDate, timeSince} from 'utils/dates';
import {PersonaState} from 'components/PersonaState';

const userAvatarStyles = css`
  @media only screen and (max-width:640px) {
    width:100%;
    max-width:184px;
    min-width:80px;
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

export const AccountDetails = ({
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
  }
}) => (
  <table>
    <tbody>
      <tr>
        <td css={css`vertical-align: top; padding: 10px 0px; max-width: 184px;`}>
          { avatarfull &&
            <img css={userAvatarStyles} src={avatarfull} alt="user avatar" />
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
            <h4>Steam ID: <a css={css`color: #8bb9e0;`} href={`https://steamcommunity.com/profiles/${steamid}`} target="_blank" rel="noopener noreferrer">{steamid}</a></h4>
          }
          <div>
            <span css={css`font-weight: bold; font-size: 0.75em;`}>This user's status is:</span>
            <PersonaState state={personastate} />
            <div css={css`color: #eeeeee; font-weight: bold; padding: 0px; font-size: 0.75em;`}>
              { timecreated && timecreated !== 0 && (
                <Fragment>
                  Steam user since { accountCreationDate(timecreated) }
                </Fragment>
              )}
              <br />
              { realname && <span id="user_realname">{realname} | </span> }
              { cityid && <span id="user_cityid">{cityid}, </span> }
              { locstatecode && <span id="user_state">{locstatecode}, </span> }
              { loccountrycode && <span id="user_country">{loccountrycode}</span> }
              <br />
              <br />
              { lastlogoff &&
                <Fragment>
                  Last logoff: <span id="last_logoff_datetime" title={accountCreationDate(timecreated)}>{timeSince(lastlogoff * 1000)} ago</span>
                </Fragment>
              }
              { gameextrainfo &&
                <Fragment>
                  <br />Currently Playing: <span id="current_app">{gameextrainfo}</span>
                </Fragment>
              }
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
);
