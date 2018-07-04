import React from 'react';
import { Link } from 'react-router-dom';

import './home.scss';

const HomePage = ({ user }) => {
  const loggedIn = user && user.account_id;
  const accountID = loggedIn ? user.account_id : 0;
  const accountLink = (
    <React.Fragment key="account-link">
      Lookup Your Account ID: <a href={`/account?username=${accountID}`} className="open-modal">{accountID}</a>
    </React.Fragment>
  );
  const accountLogoutLink = <a key="home-logout" className="openid-logout" href="/logout">(Log out)</a>;
  const accountLoginLink = <Link className="steam-login-button" to="/login" />;

  const accountOption = loggedIn ? [accountLink, <br key="home-break" />, accountLogoutLink] : accountLoginLink;

  return (
    <div className="content-main">
      <div className="app-title">
        <h1><i className="fa fa-dashboard"></i> {process.env.REACT_APP_NAME}</h1>
        <p className="italic">Get the value and size of your Steam account</p>
      </div>
      <form className="account-search-form open-modal-form" action="./account" method="get" title="Account Search">
        <label htmlFor="basic-url">Your Steam profile URL:</label>
        <div className="input-group">
          <span className="input-group-addon steam-profile-url">https://steamcommunity.com/id/</span>
          <input type="text" className="form-control url-text" id="basic-url" name="username" placeholder="username or id" />
          <span className="input-group-btn">
            <button className="btn btn-default search-submit" type="submit"><i className="fa fa-search fa-fw"></i></button>
          </span>
        </div>
      </form>
      <div className="option-divider">or</div>
      <div className="steam-account-option">
        { accountOption }
      </div>
      <div className="spacer"></div>
      <p className="special-notice">Note: Your Steam profile must be <a href="https://support.steampowered.com/kb_article.php?ref=4113-YUDH-6401" target="_blank" rel="noopener noreferrer">publicly viewable</a> for this tool to work!</p>
    </div>
  );
}

export default HomePage;
