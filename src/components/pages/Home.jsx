/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import AccountOptions from '../AccountOptions';
import SearchForm from '../SearchForm';
import SpecialNotice from '../SpecialNotice';
import TitleIntro from '../TitleIntro';

const optionDividerStyles = css`
  clear: both;
  display: block;
  margin: 10px auto;
  text-align: center;
  width: 100%;
`;

const spacerStyles = css`
  clear: both;
  height: 1em;
  width: 100%;
`;

const HomePage = ({
  isFriends = false,
  searchType = 'account',
  setUser,
  user
}) => (
  <div className="content-main">
    <TitleIntro isFriends={isFriends} />
    <SearchForm searchType={searchType} />
    <div css={optionDividerStyles}>or</div>
    <AccountOptions user={user} setUser={setUser} />
    <div css={spacerStyles} />
    <SpecialNotice />
  </div>
);

export default HomePage;
