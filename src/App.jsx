import React, {useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import {checkLoginStatus} from './actions';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';

const App = (props) => {
  // empty object (instead of `null`) default for easier downstream destructuring
  const [user, setUser] = useState({});
  const [loginStateChecked, setLoginStateChecked] = useState(false);
  const [checkLoginError, setCheckLoginError] = useState(false);

  // @TODO When/How often do we want to check login status?
  async function maybeCheckLogin() {
    if (!user || !user.session_start) {
      const userData = await checkLoginStatus();

      if (!userData) {
        // Either the server is down or the user is having connectivity issues
        setCheckLoginError(true)
      } else {
        if (userData.session_start) {
          setUser(userData)
        }
      }

      setLoginStateChecked(true)
    }
  }

  // @TODO use an event hook so it doesn't run on every re-render
  !loginStateChecked && maybeCheckLogin();

  return (
    <Router>
      <div>
        <MetaTags>
          {
          // global meta tags here
          // @TODO clean up these metatags and reference static asset paths
          // these lines prevent the site from being indexed
          process.env.REACT_APP_DISABLE_INDEXING_P &&
            <React.Fragment>
              <meta name="robots" content="noindex, nofollow" />
              <meta name="googlebot" content="noindex" />
            </React.Fragment>
          }
        </MetaTags>
        <Header setUser={setUser} user={user} />
        <Body checkLoginError={checkLoginError} setUser={setUser} user={user} />
        {/* @TODO App & Search Loader  */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
