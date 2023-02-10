import {Fragment} from 'react';
import AccountLink from './AccountLink';
import LoginLink from './LoginLink';
import LogoutLink from './LogoutLink';

const AccountOptions = ({isFriends, user: { account_id: accountId } = {}, setUser}) => (
  <div style={{width: '100%', textAlign: 'center', display: 'block', margin: 'auto'}}>
    { !accountId ? (
      <LoginLink />
    ) : (
      <Fragment>
        <AccountLink accountID={accountId} linkType={isFriends ? 'friends' : 'account'} />
        <br />
        <LogoutLink setUser={setUser} />
      </Fragment>
    )}
  </div>
);

export default AccountOptions;
