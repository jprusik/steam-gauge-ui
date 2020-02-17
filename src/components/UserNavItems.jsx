import React from 'react';
import {Link} from 'react-router-dom';

const AccountLink = ({accountId}) => (
  <li key="account" className="steam-account">
    <Link to={`/account/${accountId}`} className="open-modal"><i className="fa fa-user fa-fw"></i> Your account</Link>
  </li>
);

const LogoutButton = () => (
  <li key="logout" className="steam-logout">
    <div className="btn-group">
      {/* Must be an anchor for the request to get proxied */}
      <a href="/logout" className="btn btn-primary btn-sm navbar-btn">Log out</a>
    </div>
  </li>
);

const LoginButton = () => (
  <li className="steam-login">
    <div className="btn-group">
      <Link to="/login" className="btn btn-primary btn-sm navbar-btn">Log in</Link>
    </div>
  </li>
);

const UserNavItems = ({user: {account_id: accountId}}) =>
  !!accountId ?
    (
      <React.Fragment>
        <AccountLink accountId={accountId} />
        <LogoutButton />
      </React.Fragment>
    ) : (
      <LoginButton />
    );

export default UserNavItems;
