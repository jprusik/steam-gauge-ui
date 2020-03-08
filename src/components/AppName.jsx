/** @jsx jsx */
import {Fragment} from 'react';
import {css, jsx} from '@emotion/core';
import Tooltip from '@material-ui/core/Tooltip';
import {AppBanner} from './AppBanner';


const appNameStyles = css`
  align-items: center;
  display: flex;
  flex-direction: row;
  min-width: 150px;
`;

const tooltipImageStyles = css`
  flex: 0 1 32px;
  margin-right: 1em;
  width: 32px;
`;

const appNameTextStyles = css`
  align-items: flex-start;
  display: flex;
  flex-flow: column nowrap;
  flex: 2 2 auto;
`;

export const AppName = ({img_logo_url, img_icon_url: iconImage, name, app_website, appid}) => (
  <div css={appNameStyles}>
    { iconImage &&
      <Tooltip title={<AppBanner {...{appid, img_logo_url}} />} arrow>
        <img
          css={tooltipImageStyles}
          loading="lazy"
          src={`https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${appid}/${iconImage}.jpg`}
        />
      </Tooltip>
    }
    <div css={appNameTextStyles}>
      <a
        href={`https://store.steampowered.com/app/${appid}`}
        rel="noopener noreferrer"
      >
        {name || appid}
      </a>
      { app_website &&
        <Fragment>
          <br/>
          <a
            href={app_website}
            rel="noopener noreferrer"
          >
            (website)
          </a>
        </Fragment>
      }
    </div>
  </div>
);
