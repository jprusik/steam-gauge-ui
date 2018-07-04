import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MetaTags from 'react-meta-tags';

import { checkLoginStatus } from './Actions';
import AppHead from './components/appHead';
import AppBody from './components/appBody';
import AppFoot from './components/appFoot';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null }
  }

  componentDidMount() {
    // TODO: When/How often do we want to check login status?
    this.checkLogin();
  }

  checkLogin() {
    if (!this.state.user || !this.state.user.session_start) {
      checkLoginStatus()
      .then(data => this.setState({
        user: data
      }));
    }
  }

  render() {
    const user = this.state.user;

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
          <AppHead user={user} />
          <AppBody {...this.state} />
          {/* TODO: App & Search Loader  */}
          <AppFoot />
        </div>
      </Router>
    );
  }
}

export default App;
