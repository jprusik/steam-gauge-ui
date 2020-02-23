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
  const [loginStateChecked, setLoginStateChecked] = useState(false)

  // TODO: When/How often do we want to check login status?
  async function maybeCheckLogin() {
    if (!user || !user.session_start) {
      const userData = await checkLoginStatus();

      if (userData.session_start) {
        setUser(userData)
      }

      setLoginStateChecked(true)
    }
  }

  !loginStateChecked && maybeCheckLogin();

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
        <Header user={user} setUser={setUser} />
        <Body user={user} setUser={setUser} />
        {/* TODO: App & Search Loader  */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
