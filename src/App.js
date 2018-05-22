import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MetaTags from 'react-meta-tags';

import AppHead from './components/appHead';
import AppBody from './components/appBody';
import AppFoot from './components/appFoot';

const App = () => (
  <Router>
    <div>
      <MetaTags>
        {
        // global meta tags here
        // TODO: clean up these metatags and reference static asset paths
        // these lines prevent the site from being indexed
        process.env.REACT_APP_DISABLE_INDEXING_P &&
          <React.Fragment>
            <meta name="robots" content="noindex, nofollow" />
            <meta name="googlebot" content="noindex" />
          </React.Fragment>
        }
      </MetaTags>
      <AppHead />
      <AppBody />
      {/* TODO: App & Search Loader  */}
      <AppFoot />
    </div>
  </Router>
);

export default App;
