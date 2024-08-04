import styled from "@emotion/styled";
import { PageContent } from "components/PageContent";

export const PrivacyPage = (): JSX.Element => (
  <PageContent>
    <PageTitle>Privacy Policy</PageTitle>
    <p>
      {process.env.REACT_APP_NAME} does not collect information on any of its
      visitors except in the following circumstances:
    </p>
    <ul>
      <li>
        {process.env.REACT_APP_NAME} uses Google Analytics. Data collected via
        Google Analytics is used to analyze site performance, prioritize
        features, and enhance user experience. If you'd like to not be tracked
        via Google Analytics, consider using a browser extension like{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          rel="noopener noreferrer"
        >
          Google Analytics Opt-out Browser Add-on
        </a>
        . I personally like{" "}
        <a href="https://www.eff.org/privacybadger" rel="noopener noreferrer">
          Privacy Badger
        </a>
        , but there are plenty of options out there.
      </li>
      <li>
        {process.env.REACT_APP_NAME} uses the Valve's Steam APIs to retrieve
        data about the account you've looked up. This account data is only
        available if{" "}
        <a
          href="https://support.steampowered.com/kb_article.php?ref=4113-YUDH-6401"
          rel="noopener noreferrer"
        >
          you've made your Steam profile public.
        </a>
      </li>
      <li>
        If you choose to log into {process.env.REACT_APP_NAME} with your Steam
        password, Valve will provide {process.env.REACT_APP_NAME} with your
        Steam ID number.{" "}
        <strong>
          No other information about your account is available unless you've
          made it publicly accessible in your Steam profile.
        </strong>{" "}
        This ID number may be stored as a cookie in your browser for easier
        account look-ups but is not used for any other purpose by{" "}
        {process.env.REACT_APP_NAME}, and is not required to use{" "}
        {process.env.REACT_APP_NAME}.
      </li>
    </ul>
    <br />
    <p>
      Except in the circumstances listed above or when required by law,{" "}
      {process.env.REACT_APP_NAME} does not actively share user data with third
      parties.
    </p>
    <p>
      Your online privacy is actually really important to me. If you have ideas,
      concerns, or questions about anything on this page, please feel free to
      e-mail me at{" "}
      <a
        href={`mailto:${process.env.REACT_APP_SUPPORT_EMAIL}`}
        rel="noopener noreferrer"
      >
        {process.env.REACT_APP_SUPPORT_EMAIL}
      </a>
      . While you're at it,{" "}
      <a href="https://supporters.eff.org/donate" rel="noopener noreferrer">
        consider donating to Electronic Frontier Foundation
      </a>{" "}
      and supporting all the good work they do for the Internet and its users.
    </p>
    <br />
    <PageTitle>Advertising</PageTitle>
    <p>
      {process.env.REACT_APP_NAME} does not currently run any ads or participate
      in any affiliate programs. If we do, those programs will be listed here
      and this policy will be updated as needed.
    </p>
    <br />
    <LastUpdatedText>
      <span>Last Updated:</span> January 24, 2021
    </LastUpdatedText>
  </PageContent>
);

const PageTitle = styled.h2`
  text-shadow: #3d3d3d 1px 1px 1px;
  color: #eeeeee;
`;

const LastUpdatedText = styled.p`
  color: #b0aeac;
  font-size: 0.7em;

  span {
    font-weight: bold;
  }
`;
