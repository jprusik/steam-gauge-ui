import React from 'react';
import { Route } from 'react-router-dom';
// import './appBody.scss';

import HomePage from '../pages/home';
import AboutPage from '../pages/about';
import PrivacyPage from '../pages/privacy';

const AppBody = () => {
  return (
    <div class="container" role="main">
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/privacy" component={PrivacyPage} />
    </div>
  );
}

export default AppBody;
