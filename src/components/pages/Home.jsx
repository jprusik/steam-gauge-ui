import styled from '@emotion/styled';
import AccountOptions from '../AccountOptions';
import SearchForm from '../SearchForm';
import {SpecialNotice} from '../SpecialNotice';
import TitleIntro from '../TitleIntro';

export const Home = ({
  isFriends = false,
  setUser,
  user
}) => (
  <PageContent>
    <TitleIntro isFriends={isFriends} />
    <SearchForm
      searchType={isFriends ? 'friends' : 'account'}
    />
    <OptionDivider>or</OptionDivider>
    <AccountOptions isFriends={isFriends} setUser={setUser} user={user} />
    <Spacer />
    <SpecialNotice />
  </PageContent>
);

const OptionDivider = styled.div`
  display: block;
  clear: both;
  margin: 10px auto;
  width: 100%;
  text-align: center;
`;

const Spacer = styled.div`
  clear: both;
  width: 100%;
  height: 1em;
`;

const PageContent = styled.div`
  margin: 5% auto;
  width: 90%;
  max-width: 640px;

  @media (min-width: 1420px) {
    width: 1420px;
  }
`;
