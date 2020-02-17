import React from 'react';
import AccountLink from '../components/AccountLink';
import LoginLink from '../components/LoginLink';
import LogoutLink from '../components/LogoutLink';

const AccountOptions = ({user: { account_id: accountId } = {}}) => (
  <div style={{width: '100%', textAlign: 'center', display: 'block', margin: 'auto'}}>
    { !!accountId
      ? (
        <React.Fragment>
          <AccountLink accountID={accountId} />
          <br />
          <LogoutLink />
        </React.Fragment>
      ) : <LoginLink />
    }
  </div>
);

export default AccountOptions;
