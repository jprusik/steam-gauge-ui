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

const contentContainerStyles = css`
  margin: 5% auto;
  max-width: 640px;
  width: 90%;

  @media (min-width: 1420px) {
    width: 1420px;
  }
`;

const Home = ({
  isFriends = false,
  setUser,
  user
}) => (
  <div css={contentContainerStyles}>
    <TitleIntro isFriends={isFriends} />
    <SearchForm searchType={isFriends ? 'friends' : 'account'} />
    <div css={optionDividerStyles}>or</div>
    <AccountOptions isFriends={isFriends} setUser={setUser} user={user} />
    <div css={spacerStyles} />
    <SpecialNotice />
  </div>
);

export default Home;
