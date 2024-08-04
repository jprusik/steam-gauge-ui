import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { User, UserState } from "types";
import { checkLoginStatus } from "actions";
import { Body } from "components/Body";
import { Footer } from "components/Footer";
import { Header } from "components/Header";

export function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loginStateChecked, setLoginStateChecked] = useState(false);
  // @TODO Give user feedback on server health
  // const [checkLoginError, setCheckLoginError] = useState(false);

  async function maybeCheckLogin() {
    if (!user || !user.session_start) {
      const userAccountId = await checkLoginStatus();

      if (userAccountId) {
        setUser({
          account_id: userAccountId,
        });
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
        <Body checkLoginError={false} setUser={setUser} user={user} />
        {/* @TODO App & Search Loader  */}
        <Footer />
      </div>
    </Router>
  );
}
