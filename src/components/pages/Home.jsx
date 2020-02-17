import React from 'react';
import AccountOptions from '../AccountOptions';
import SearchForm from '../SearchForm';
import SpecialNotice from '../SpecialNotice';
import TitleIntro from '../TitleIntro';

const HomePage = ({user}) => (
  <div className="content-main">
    <TitleIntro />
    <SearchForm searchType="account" />
    <div className="option-divider">or</div>
    <AccountOptions user={user} />
    <div className="spacer"></div>
    <SpecialNotice />
  </div>
);

export default HomePage;
