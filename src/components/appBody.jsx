import React from 'react';
import { Route } from 'react-router-dom';
import './appBody.scss';

import HomePage from '../pages/home';
import AccountPage from '../pages/account';
import AboutPage from '../pages/about';
import PrivacyPage from '../pages/privacy';
import ReceiptPage from '../pages/receipt';

const urlRedirect = (url) => {
    window.location = url;
    return null;
}

const RouteWithComponentProps = ({ component: Component, componentProps, ...routeProps }) => (
    <Route {...routeProps} render={() => <Component {...componentProps} />} />
);

const AppBody = ({ user }) => {
  const loginUrl = process.env.REACT_APP_OPEN_ID_URL

  return (
    <div className="container" role="main">
      <RouteWithComponentProps exact path="/" component={ HomePage } componentProps={ { user } } />
      <Route path="/account/:id" component={ AccountPage } />
      <Route path="/about" component={ AboutPage } />
      <Route path="/privacy" component={ PrivacyPage } />
      <Route path="/receipt" component={ ReceiptPage } />
      <Route path="/login" render={ () => urlRedirect(loginUrl) }/>
    </div>
  );
}

export default AppBody;
