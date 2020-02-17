import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import MetaTags from 'react-meta-tags';

import {checkLoginStatus} from './actions';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

const App = (props) => {
  // empty object (instead of `null`) default for easier downstream destructuring
  const [user, setUser] = useState({});

  // TODO: When/How often do we want to check login status?
  useEffect(() => {
    if (!user || !user.session_start) {
      checkLoginStatus()
        .then(data => setUser(data));
    }
  }, []);

  return (
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
        <Header user={user} />
        <Body user={user} />
        {/* TODO: App & Search Loader  */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
