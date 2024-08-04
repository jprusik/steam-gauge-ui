import { appFields } from "constants/appFields";
import { Fragment } from "react";
import styled from "@emotion/styled";
import Tooltip from "@mui/material/Tooltip";
import { AppBanner } from "components/AppBanner";

type NameCellValueProps = {
  app_website: string;
  appid: string;
  img_icon_url: string;
  img_logo_url: string;
  name: string;
};

export const Name = {
  accessor: appFields.NAME,
  Cell: ({ row: { original } }: { row: { original: NameCellValueProps } }) => (
    <NameCellValue {...original} />
  ),
  footerSpan: 0,
  Header: "Title",
  minWidth: 36,
};

const NameCellValue = ({
  app_website,
  appid,
  img_icon_url,
  img_logo_url,
  name,
}: NameCellValueProps): JSX.Element => (
  <AppNameContainer>
    {img_icon_url && (
      <Tooltip
        title={img_logo_url ? <AppBanner {...{ appid, img_logo_url }} /> : ""}
        arrow
      >
        <TooltipImage
          alt={`${name || appid} icon`}
          loading="lazy"
          src={`https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${appid}/${img_icon_url}.jpg`}
        />
      </Tooltip>
    )}
    <AppNameText>
      <a
        href={`https://store.steampowered.com/app/${appid}`}
        rel="noopener noreferrer"
      >
        {name || appid}
      </a>
      {app_website && (
        <Fragment>
          <br />
          <a href={app_website} rel="noopener noreferrer">
            (website)
          </a>
        </Fragment>
      )}
    </AppNameText>
  </AppNameContainer>
);

const AppNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 150px;
`;

const TooltipImage = styled.img`
  flex: 0 1 32px;
  margin-right: 1em;
  width: 32px;
`;

const AppNameText = styled.div`
  display: flex;
  flex: 2 2 auto;
  flex-flow: column nowrap;
  align-items: flex-start;
`;
