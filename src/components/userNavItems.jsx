import React from 'react';
import { Link } from 'react-router-dom';

function accountLink(id) {
  return (
    <li key="account" className="steam-account">
      <Link to={`/account/${id}`} className="open-modal"><i className="fa fa-user fa-fw"></i> Your account</Link>
    </li>
  );
}

function logoutLink() {
  return (
    <li key="logout" className="steam-logout">
      <div className="btn-group">
        {/* Must be an anchor for the request to get proxied */}
        <a href="/logout" className="btn btn-primary btn-sm navbar-btn">Log out</a>
      </div>
    </li>
  );
}

function loginLink() {
  return (
    <li className="steam-login">
      <div className="btn-group">
        <Link to="/login" className="btn btn-primary btn-sm navbar-btn">Log in</Link>
      </div>
    </li>
  );
}

const UserNavItems = ({user}) => {
  const loggedIn = user && user.account_id;

  if (loggedIn) {
    return [accountLink(user.account_id), logoutLink()];
  }
  return loginLink();
}

export default UserNavItems;
