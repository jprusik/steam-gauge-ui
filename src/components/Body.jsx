import React from 'react';
import {Switch, Route} from 'react-router-dom';
import AboutPage from './pages/About';
import AccountPage from './pages/Account';
import FriendsPage from './pages/Friends';
import HomePage from './pages/Home';
import PrivacyPage from './pages/Privacy';
import ReceiptPage from './pages/Receipt';
import './Body.scss';

const urlRedirect = (url) => {
    window.location = url;
    return null;
}

const RouteWithComponentProps = ({component: Component, componentProps, ...routeProps}) => (
  <Route {...routeProps} render={() => <Component {...{...routeProps, ...componentProps}} />} />
);

const loginUrl = process.env.REACT_APP_OPEN_ID_URL;

// Note: order of the routes matters!
const Body = ({user, setUser}) => (
  <div className="container" role="main">
    <Switch>
      <RouteWithComponentProps exact path="/" component={HomePage} componentProps={{user, setUser}} />
      <Route path="/account/:id" component={AccountPage} />
      <RouteWithComponentProps path="/friends/:id" component={FriendsPage} componentProps={{user}} />
      <RouteWithComponentProps path="/friends" component={FriendsPage} componentProps={{user, setUser}} />
      <Route path="/about" component={AboutPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/receipt" component={ReceiptPage} />
      <Route path="/login" render={() => urlRedirect(loginUrl)}/>
    </Switch>
  </div>
);

export default Body;
