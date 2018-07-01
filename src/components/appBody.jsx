import React from 'react';
import { Route } from 'react-router-dom';
import './appBody.scss';

import HomePage from '../pages/home';
import AccountPage from '../pages/account';
import AboutPage from '../pages/about';
import PrivacyPage from '../pages/privacy';
import ReceiptPage from '../pages/receipt';

const urlRedirect = (url) => {
  return () => window.location = url;
}

const AppBody = () => {
  const loginUrl = process.env.REACT_APP_OPEN_ID_URL

  return (
    <div className="container" role="main">
      <Route exact path="/" component={ HomePage } />
      <Route path="/account" component={ AccountPage } />
      <Route path="/about" component={ AboutPage } />
      <Route path="/privacy" component={ PrivacyPage } />
      <Route path="/receipt" component={ ReceiptPage } />
      <Route path="/login" component={ urlRedirect(loginUrl) }/>
    </div>
  );
}

export default AppBody;
