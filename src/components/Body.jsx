import React from 'react';
import {Switch, Route} from 'react-router-dom';
import AboutPage from './pages/About';
import AccountPage from './pages/Account';
import FriendsPage from './pages/Friends';
import Home from './pages/Home';
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
const Body = ({checkLoginError = false, setUser, user}) => (
  <React.Fragment>
    <div className="container" role="main">
      { checkLoginError && (
        <div className="alert alert-danger" style={{maxWidth: '66vw', margin: '0 auto 20px auto'}} role="alert">Are you connected to the internet? There was an issue connecting to the Steam Gauge server. Some features may not operate correctly.</div>
      )}
      <Switch>
        <RouteWithComponentProps exact path="/" component={Home} componentProps={{user, setUser}} />
        <Route path="/account/:id" component={AccountPage} />
        <RouteWithComponentProps path="/friends/:id" component={FriendsPage} componentProps={{user}} />
        <RouteWithComponentProps path="/friends" component={Home} componentProps={{isFriends: true, user, setUser}} />
        <Route path="/about" component={AboutPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/receipt" component={ReceiptPage} />
        <Route path="/login" render={() => urlRedirect(loginUrl)}/>
      </Switch>
    </div>
  </React.Fragment>
);

export default Body;
