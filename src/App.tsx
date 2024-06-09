import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { User } from 'types';
import { checkLoginStatus } from 'actions';
import { Body } from 'components/Body';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';

export function App(): JSX.Element {
  // empty object (instead of `null`) default for easier downstream destructuring
  const [user, setUser] = useState<User | Record<string, never>>({});
  const [loginStateChecked, setLoginStateChecked] = useState(false);
  const [checkLoginError, setCheckLoginError] = useState(false);

  // @TODO When/How often do we want to check login status?
  async function maybeCheckLogin() {
    if (!user || !user.session_start) {
      const userData = await checkLoginStatus();

      if (!userData) {
        // Either the server is down or the user is having connectivity issues
        setCheckLoginError(true);
      } else {
        if (userData.session_start) {
          setUser(userData);
        }
      }

      setLoginStateChecked(true);
    }
  }

  // @TODO use an event hook so it doesn't run on every re-render
  !loginStateChecked && maybeCheckLogin();

  return (
    <Router>
      <div>
        <Header setUser={setUser} user={user} />
        <Body checkLoginError={checkLoginError} setUser={setUser} user={user} />
        {/* @TODO App & Search Loader  */}
        <Footer />
      </div>
    </Router>
  );
}
