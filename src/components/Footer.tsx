import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled/macro";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import { SupportDialog } from "components/modals/SupportDialog";
import "./Footer.scss";

export function Footer(): JSX.Element {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState<string | undefined>();
  const today = new Date();

  const DIALOG_IDS = {
    SUPPORT: "support",
  };

  return (
    <StyledFooter className="footer footer-inverse">
      <div className="container">
        <div className="text-muted">
          <div className="footer-nav"></div>
          <Container>
            <Link to="/">{t("action_prompt.home_link")}</Link>
            <Link to="/about">{t("action_prompt.about_link")}</Link>
            <Link to="/privacy">{t("action_prompt.privacy_link")}</Link>
            <a
              href={process.env.REACT_APP_CODE_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("action_prompt.code_link")}
            </a>
            <TextButton onClick={() => setOpenDialog(DIALOG_IDS.SUPPORT)}>
              <FavoriteBorderIcon className="favoriteIcon" />
              {t("action_prompt.support_link")}
            </TextButton>
          </Container>
          <div className="site-info">
            Database last updated at {process.env.REACT_APP_LAST_DB_UPDATE}
            <br />
            <a href="https://store.steampowered.com">Powered by Steam.</a> Valve
            and Steam are trademarks of Valve Corporation.{" "}
            {process.env.REACT_APP_PRETTY_DOMAIN_URL} is not affiliated with
            Valve in any way.
            <br />
            2013-{today.getFullYear()}, {process.env.REACT_APP_NAME} | Developed
            by{" "}
            <a href={`${process.env.REACT_APP_AUTHOR_WEBSITE}`}>
              {process.env.REACT_APP_AUTHOR_NAME}
            </a>
            . Questions? Notice an issue? Let me know at{" "}
            <a href={`mailto:${process.env.REACT_APP_SUPPORT_EMAIL}`}>
              {process.env.REACT_APP_SUPPORT_EMAIL}
            </a>
            <br />
            <br />
            <SupportDialog
              handleDismiss={() => setOpenDialog(undefined)}
              isOpen={openDialog === DIALOG_IDS.SUPPORT}
            />
          </div>
        </div>
      </div>
    </StyledFooter>
  );
}

const TextButton = styled(Button)`
  padding: 0;
  min-width: unset;
  text-transform: none;
`;

const StyledFooter = styled.footer`
  a,
  ${TextButton} {
    color: #337ab7;

    :hover,
    :active,
    :focus-visible {
      background: none;
      color: #a0cbf5;

      .favoriteIcon {
        color: #db61a2;
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;

  > a,
  > ${TextButton} {
    display: inline-flex;
    align-items: center;
    margin-right: 8px;
    border: 2px solid transparent;
    padding: 0;
    text-decoration: none;
    line-height: 1em;
    font-size: 12px;
    font-weight: normal;

    .favoriteIcon {
      margin-right: 2px;
      width: auto;
      height: 14px;
    }
  }
`;
